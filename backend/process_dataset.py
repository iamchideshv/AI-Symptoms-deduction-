import pandas as pd
import json
import os
import numpy as np

# Paths
INPUT_DIR = r"Z:\Project Parts\AI-SYMTOMP DEDUCTER\Symptoms_Dataset"
DATASET_PATH = os.path.join(INPUT_DIR, "dataset.csv")
DESC_PATH = os.path.join(INPUT_DIR, "symptom_Description.csv")
PREC_PATH = os.path.join(INPUT_DIR, "symptom_precaution.csv")

OUTPUT_DIR = r"Z:\Project Parts\AI-SYMTOMP DEDUCTER\backend\data"
OUT_SYMPTOMS_PATH = os.path.join(OUTPUT_DIR, "symptoms_data.csv")
OUT_METADATA_PATH = os.path.join(OUTPUT_DIR, "metadata.json")

print("Processing Kaggle Dataset...")

# 1. Process main dataset
df = pd.read_csv(DATASET_PATH)
df['Disease'] = df['Disease'].str.strip()

# Clean all symptom columns
for col in df.columns[1:]:
    df[col] = df[col].astype(str).str.strip().replace("nan", "")

# Extract all unique symptoms
all_symptoms = set()
for col in df.columns[1:]:
    for val in df[col]:
        if val and pd.notna(val) and val != "":
            all_symptoms.add(val)

all_symptoms = sorted(list(all_symptoms))

# Create one-hot encoded dictionary
encoded_dict = {"Disease": df["Disease"].tolist()}
for sym in all_symptoms:
    encoded_dict[sym] = np.zeros(len(df), dtype=int)

# Populate one-hot encoding efficiently
symptom_cols = df.columns[1:]
for idx, row in df.iterrows():
    for col in symptom_cols:
        val = row[col]
        if val and pd.notna(val) and val != "":
            encoded_dict[val][idx] = 1

df_encoded = pd.DataFrame(encoded_dict)

# Save one-hot encoded dataset
os.makedirs(OUTPUT_DIR, exist_ok=True)
df_encoded.to_csv(OUT_SYMPTOMS_PATH, index=False)
print(f"Saved one-hot encoded dataset to {OUT_SYMPTOMS_PATH} (Shape: {df_encoded.shape})")

# 2. Process metadata
# Load descriptions
df_desc = pd.read_csv(DESC_PATH)
df_desc['Disease'] = df_desc['Disease'].str.strip()
desc_dict = dict(zip(df_desc['Disease'], df_desc['Description']))

# Load precautions
df_prec = pd.read_csv(PREC_PATH)
df_prec['Disease'] = df_prec['Disease'].str.strip()

metadata = {}
# Default urgency mapping depending on keyword (basic mapping)
high_urgency = ["Heart attack", "Paralysis (brain hemorrhage)", "COVID-19", "Pneumonia", "Malaria", "Typhoid", "Tuberculosis"]
low_urgency = ["Common Cold", "Acne", "Allergy", "Fungal infection", "Urinary tract infection"]

for disease in pd.Series(encoded_dict["Disease"]).unique():
    precautions = []
    if disease in df_prec['Disease'].values:
        row = df_prec[df_prec['Disease'] == disease].iloc[0]
        # Collect up to 4 precautions
        for prec_col in ['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']:
            if pd.notna(row[prec_col]) and str(row[prec_col]).strip():
                precautions.append(str(row[prec_col]).strip().capitalize())
                
    desc = desc_dict.get(disease, "Information not available at this time.")
    
    urgency = "Medium"
    if disease in high_urgency:
        urgency = "High"
    elif disease in low_urgency:
        urgency = "Low"
    
    metadata[disease] = {
        "urgency": urgency,
        "advice": "Please consult a healthcare professional for proper medical advice and diagnosis.",
        "precautions": precautions if precautions else ["Please consult a doctor for specific precautions."],
        "description": desc
    }

with open(OUT_METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print(f"Saved metadata for {len(metadata)} diseases to {OUT_METADATA_PATH}")
