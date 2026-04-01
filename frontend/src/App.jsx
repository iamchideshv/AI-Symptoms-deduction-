import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SymptomForm from './components/SymptomForm';
import PredictionResults from './components/PredictionResults';
import Disclaimer from './components/Disclaimer';

const API_BASE_URL = 'http://localhost:8000';

function App() {
    const [view, setView] = useState('landing');
    const [loading, setLoading] = useState(false);
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [results, setResults] = useState([]);
    const [extractedSymptoms, setExtractedSymptoms] = useState([]);
    const [error, setError] = useState(null);

    // Fetch symptoms on mount
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/symptoms`);
                setAvailableSymptoms(response.data.symptoms);
            } catch (err) {
                console.error("Failed to fetch symptoms:", err);
            }
        };
        fetchSymptoms();
    }, []);

    const handleStart = () => setView('form');

    const handleReset = () => {
        setView('landing');
        setResults([]);
        setExtractedSymptoms([]);
        setError(null);
    };

    const handleAnalyze = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/predict`, {
                symptoms_text: data.text,
                selected_symptoms: data.selected
            });

            setResults(response.data.predictions);
            setExtractedSymptoms(response.data.extracted_symptoms);
            setView('results');
        } catch (err) {
            console.error("Analysis failed:", err);
            setError(err.response?.data?.detail || "Connection error. Make sure the backend is running on port 8000.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <Disclaimer variant="full" />

            <main className="flex-grow flex flex-col">
                {error && (
                    <div className="max-w-3xl mx-auto w-full mt-6 px-4">
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center space-x-3 text-rose-700">
                            <span className="font-bold flex-shrink-0">Error:</span>
                            <p className="text-sm">{error}</p>
                            <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-rose-600">×</button>
                        </div>
                    </div>
                )}

                {view === 'landing' && <LandingPage onStart={handleStart} />}

                {view === 'form' && (
                    <SymptomForm
                        availableSymptoms={availableSymptoms}
                        onSubmit={handleAnalyze}
                        loading={loading}
                    />
                )}

                {view === 'results' && (
                    <PredictionResults
                        results={results}
                        symptoms={extractedSymptoms}
                        onReset={handleReset}
                    />
                )}
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                    <p>© 2026 HealthCheck AI Hackathon Project. For demo purposes only.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary-600 underline">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-600 underline">Terms of Service</a>
                        <a href="#" className="hover:text-primary-600 underline">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
