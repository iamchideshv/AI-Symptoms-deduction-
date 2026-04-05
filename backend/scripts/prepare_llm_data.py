import pandas as pd
import json
import random
import os

def generate_variations(disease, symptoms, meta):
    """Generates multiple conversation styles for a single case."""
    symptom_str = ", ".join([s.replace('_', ' ') for s in symptoms])
    
    variations = []
    
    # Variation 1: Direct Q&A (Standard Alpaca)
    variations.append({
        "instruction": f"I am experiencing the following symptoms: {symptom_str}. What is the most likely diagnosis and what should I do?",
        "input": "",
        "output": f"Based on the symptoms provided, the most likely diagnosis is **{disease}**. {meta.get('description', '')}\n\n**Advice:** {meta.get('advice', 'Please consult a doctor.')}\n\n**Recommended Precautions:**\n- " + "\n- ".join(meta.get('precautions', ['Consult a professional']))
    })
    
    # Variation 2: Empathetic Doctor Dialogue
    variations.append({
        "instruction": "Patient Consultation",
        "input": f"Doctor, I've been feeling quite unwell lately. I have {symptom_str}. I'm a bit worried.",
        "output": f"I understand your concern. Let's look at these symptoms carefully. Your presentation of {symptom_str} is highly indicative of **{disease}**.\n\n{meta.get('description', 'This condition requires clinical evaluation.')}\n\nFor immediate steps, I recommend: {meta.get('advice', '')}. Additionally, please follow these precautions:\n" + ", ".join(meta.get('precautions', [])) + ". We should monitor this closely."
    })
    
    # Variation 3: Clinical Case Study (For reasoning)
    variations.append({
        "instruction": "Analyze this clinical presentation and provide a summary.",
        "input": f"Patient presents with {symptom_str}. No other significant history reported.",
        "output": f"### Clinical Assessment\n**Primary Impression:** {disease}\n**Severity/Urgency:** {meta.get('urgency', 'Not specified')}\n\n**Discussion:** The cluster of symptoms ({symptom_str}) strongly points towards {disease}. {meta.get('description', '')}\n\n**Management Plan:** {meta.get('advice', '')}\n**Patient Education:** Advise patient on: " + ", ".join(meta.get('precautions', []))
    })

    return variations

def main():
    print("🚀 Starting Medical LLM Dataset Generation...")
    
    # Ensure paths are correct relative to project root
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    csv_path = os.path.join(base_dir, 'data', 'symptoms_data.csv')
    meta_path = os.path.join(base_dir, 'data', 'metadata.json')
    output_path = os.path.join(base_dir, 'data', 'medical_llm_10k.jsonl')

    if not os.path.exists(csv_path) or not os.path.exists(meta_path):
        print("❌ Error: Original dataset files not found at backend/data/")
        return

    df = pd.read_csv(csv_path)
    with open(meta_path, 'r') as f:
        metadata = json.load(f)

    llm_data = []

    for _, row in df.iterrows():
        disease = row['Disease']
        # Filter columns where value is 1
        active_symptoms = [col for col in df.columns[1:] if row[col] == 1]
        
        if not active_symptoms:
            continue
            
        disease_meta = metadata.get(disease, {})
        
        # Add variations to dataset
        case_variations = generate_variations(disease, active_symptoms, disease_meta)
        llm_data.extend(case_variations)

    # Augmentation: If we need more rows, we can shuffle and slightly tweak instructions
    # Current df (~4900) * 3 variations = ~14,700 rows.
    
    print(f"✅ Generated {len(llm_data)} instruction-response pairs.")

    # Write to JSONL
    with open(output_path, 'w', encoding='utf-8') as f:
        for entry in llm_data:
            f.write(json.dumps(entry) + '\n')

    print(f"📂 Dataset saved to: {output_path}")

if __name__ == "__main__":
    main()
