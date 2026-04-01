import re

def normalize_text(text: str) -> str:
    """Lowercase and remove special characters, replacing spaces with underscores for mapping."""
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text

def extract_symptoms(user_input: str, known_symptoms: list) -> list:
    """
    Extract known symptoms from free text.
    known_symptoms is a list of symptom names with underscores (e.g. 'body_aches').
    """
    normalized_input = normalize_text(user_input)
    found_symptoms = []
    
    for symptom in known_symptoms:
        # Check for both underscore and space versions (case-insensitive)
        space_version = symptom.replace('_', ' ').lower()
        symptom_lower = symptom.lower()
        
        # Simple keyword matching
        if space_version in normalized_input or symptom_lower in normalized_input:
            found_symptoms.append(symptom)
            
    return sorted(list(set(found_symptoms)))
