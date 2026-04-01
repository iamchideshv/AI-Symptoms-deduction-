import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# When running with python -m app.main, we need these imports
try:
    from app.nlp import extract_symptoms, normalize_text
    from app.model import SymptomModel
    from app.utils import load_metadata, get_disease_info
except ImportError:
    # When running directly as python main.py or similar
    from nlp import extract_symptoms, normalize_text
    from model import SymptomModel
    from utils import load_metadata, get_disease_info

# Initial setup
# Determine base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DATA_PATH = os.path.join(DATA_DIR, "symptoms_data.csv")
METADATA_PATH = os.path.join(DATA_DIR, "metadata.json")

# Initialize model
model = SymptomModel(MODEL_DATA_PATH)
model.train()

# Load metadata
metadata = load_metadata(METADATA_PATH)

# FastAPI instance
app = FastAPI(
    title="AI-Powered Symptom Checker API",
    description="A simple API for predicting diseases based on symptoms.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class SymptomRequest(BaseModel):
    symptoms_text: Optional[str] = ""
    selected_symptoms: Optional[List[str]] = []

class SymptomResponse(BaseModel):
    predictions: List[dict]
    extracted_symptoms: List[str]
    disclaimer: str

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_trained": model.is_trained}

@app.get("/symptoms")
def get_available_symptoms():
    return {"symptoms": [s.replace('_', ' ').title() for s in model.get_all_symptoms()]}

@app.post("/predict", response_model=SymptomResponse)
async def predict_disease(request: SymptomRequest):
    all_known_symptoms = model.get_all_symptoms()
    extracted_from_text = []
    if request.symptoms_text:
        extracted_from_text = extract_symptoms(request.symptoms_text, all_known_symptoms)
    
    chips_normalized = []
    all_known_lower = [s.lower() for s in all_known_symptoms]
    for chip in request.selected_symptoms:
        norm_chip = chip.lower().replace(' ', '_')
        if norm_chip in all_known_lower:
            # Map back to original case
            idx = all_known_lower.index(norm_chip)
            chips_normalized.append(all_known_symptoms[idx])
            
    final_symptoms = sorted(list(set(extracted_from_text + chips_normalized)))
    
    if not final_symptoms:
        raise HTTPException(status_code=400, detail="No symptoms detected. Please describe your symptoms or select them from the list.")
    
    preds = model.predict(final_symptoms)
    enriched_preds = []
    for p in preds:
        info = get_disease_info(p['disease'], metadata)
        enriched_preds.append({
            "disease": p['disease'],
            "confidence": p['confidence'],
            "urgency": info['urgency'],
            "advice": info['advice'],
            "precautions": info['precautions'],
            "description": info['description']
        })
        
    return {
        "predictions": enriched_preds,
        "extracted_symptoms": [s.replace('_', ' ').title() for s in final_symptoms],
        "disclaimer": "DISCLAIMER: This tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment."
    }

if __name__ == "__main__":
    import uvicorn
    # Important: when running with python -m app.main, uvicorn needs to know the package name
    module = "app.main:app" if "app" in os.path.basename(os.path.dirname(__file__)) else "main:app"
    uvicorn.run(module, host="0.0.0.0", port=8000, reload=True)
