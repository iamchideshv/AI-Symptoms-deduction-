# 🩺 Medical LLM Training Script (Google Colab Version)
# Run this in a Google Colab 'T4 GPU' runtime.

"""
INSTRUCTIONS:
1. Go to https://colab.research.google.com/
2. Click 'New Notebook'
3. Go to 'Runtime' -> 'Change runtime type' -> Select 'T4 GPU'
4. Upload your 'medical_llm_10k.jsonl' to the file icon on the left.
5. Paste this code into a cell and run it!
"""

# --- 1. Install Dependencies ---
import os
os.system('pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes')
os.system('pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"')

from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# --- 2. Configuration ---
max_seq_length = 2048
dtype = None # None for auto detection. Float16 for Tesla T4, V100, Bfloat16 for Ampere+
load_in_4bit = True # Use 4bit quantization to reduce memory usage.

# --- 3. Load Model ---
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/llama-3-8b-bnb-4bit",
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)

# Add LoRA adapters
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # Rank (higher = more memory, better learning)
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = "unsloth",
    random_state = 3407,
)

# --- 4. Load Dataset ---
dataset = load_dataset("json", data_files="medical_llm_10k.jsonl", split="train")

# --- 5. Training ---
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "instruction", # Using alpaca style
    max_seq_length = max_seq_length,
    dataset_num_proc = 2,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60, # Increase this to 500 for full training
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = "outputs",
    ),
)

print("🚀 Starting Training...")
trainer.train()

# --- 6. Save & Export to GGUF (For Local Use) ---
print("📦 Saving Model to GGUF format...")
model.save_pretrained_gguf("medical_model_gguf", tokenizer, quantization_method = "q4_k_m")

print("✅ DONE! Download the 'medical_model_gguf-q4_k_m.gguf' file from the sidebar.")
