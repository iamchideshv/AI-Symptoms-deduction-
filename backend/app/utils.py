import json
import os

def load_metadata(file_path: str) -> dict:
    if not os.path.exists(file_path):
        return {}
    with open(file_path, 'r') as f:
        return json.load(f)

def get_disease_info(disease: str, metadata: dict) -> dict:
    return metadata.get(disease, {
        "urgency": "Unknown",
        "advice": "Please consult a medical professional.",
        "precautions": ["Consult a doctor"],
        "description": "Information not available."
    })
