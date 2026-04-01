import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os

class SymptomModel:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.label_encoder = LabelEncoder()
        self.symptom_columns = []
        self.is_trained = False

    def train(self):
        if not os.path.exists(self.data_path):
            print(f"Data file not found at {self.data_path}")
            return

        df = pd.read_csv(self.data_path)
        
        # Target variable
        y = df['Disease']
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Features
        X = df.drop('Disease', axis=1)
        self.symptom_columns = list(X.columns)
        
        self.model.fit(X, y_encoded)
        self.is_trained = True
        print("Model trained successfully.")

    def predict(self, symptoms: list):
        if not self.is_trained:
            return []

        # Create binary vector
        input_vec = [1 if col in symptoms else 0 for col in self.symptom_columns]
        input_vec = np.array(input_vec).reshape(1, -1)
        
        # Get probabilities for all classes
        probs = self.model.predict_proba(input_vec)[0]
        
        # Get top 3 indices
        top_indices = np.argsort(probs)[-3:][::-1]
        
        results = []
        for idx in top_indices:
            confidence = float(probs[idx])
            if confidence > 0:
                disease = self.label_encoder.inverse_transform([idx])[0]
                results.append({
                    "disease": disease,
                    "confidence": round(confidence * 100, 2)
                })
        
        return results

    def get_all_symptoms(self):
        return self.symptom_columns
