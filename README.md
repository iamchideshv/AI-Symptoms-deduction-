# AI-Powered Symptom Checker (Hackathon MVP)

A clean, modern, and intelligent web application for healthcare AI hackathons. Users can enter symptoms in plain English or select them from a list to receive potential condition matches with confidence scores and medical guidance.

## 🚀 Features
- **Smart Symptom Extraction**: Uses NLP to identify symptoms from free-text descriptions.
- **ML Predictions**: Random Forest classifier trained on a structured disease-symptom dataset.
- **Premium UI**: Modern healthcare aesthetic with Teal/Blue accents, sleek animations, and responsive design.
- **Safety First**: Integrated medical disclaimers, urgency levels (Low/Medium/High), and tailored precautions.
- **Multi-Input**: Supports both typing and chip-based selections.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide icons, Axios.
- **Backend**: FastAPI (Python), Scikit-Learn, Pandas.
- **ML**: Random Forest Classifier.
- **NLP**: Custom keyword normalization and extraction layer.

## 📁 Project Structure
```
/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI Entry Point
│   │   ├── model.py       # ML Training & Prediction
│   │   ├── nlp.py         # Keyword Extraction Logic
│   │   └── utils.py       # Metadata Helpers
│   ├── data/
│   │   ├── symptoms_data.csv   # Training Dataset
│   │   └── metadata.json       # Disease Information (Advice/Urgency)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI Blocks
│   │   ├── App.jsx        # Main Logic & State
│   │   └── index.css      # Tailwind & Global Styles
│   └── package.json
└── README.md
```

## 🏃 How to Run

### 1. Backend (FastAPI)
```bash
cd backend
# Create virtual env (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app/main.py
# AI analysis will be available at http://localhost:8000
```

### 2. Frontend (React)
```bash
# Return to root directory if you are in backend/
cd ..

cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
# The app will be available at http://localhost:5173
```

## ⚠️ Medical Disclaimer
This application is for **educational and hackathon demonstration purposes only**. It DOES NOT provide medical diagnoses. Always consult a licensed medical professional for health concerns. In case of a medical emergency, visit your nearest emergency room immediately.
