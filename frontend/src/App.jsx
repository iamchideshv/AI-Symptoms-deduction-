import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SymptomForm from './components/SymptomForm';
import PredictionResults from './components/PredictionResults';
import Disclaimer from './components/Disclaimer';
import ImageUpload from './components/ImageUpload';
import ImageAnalysisResult from './components/ImageAnalysisResult';
import UnifiedHub from './components/UnifiedHub';
import NearbyCare from './components/NearbyCare';

const API_BASE_URL = 'http://localhost:8000';

function App() {
    const [view, setView] = useState('landing');
    const [loading, setLoading] = useState(false);
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [results, setResults] = useState([]);
    const [extractedSymptoms, setExtractedSymptoms] = useState([]);
    const [imageAnalysisData, setImageAnalysisData] = useState(null);
    const [error, setError] = useState(null);
    const [initialSymptoms, setInitialSymptoms] = useState('');
    const [history, setHistory] = useState(['landing']);

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

    const navigateTo = (newView) => {
        setHistory(prev => [...prev, view]);
        setView(newView);
        setError(null);
    };

    const navigateBack = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const prevView = newHistory.pop();
            setHistory(newHistory);
            setView(prevView);
        } else {
            setView('landing');
        }
        setError(null);
    };

    const handleStart = () => {
        navigateTo('unified_hub');
    };

    const handleStartText = (text = '') => {
        setInitialSymptoms(text);
        navigateTo('form');
    };

    const handleStartImage = () => navigateTo('image_upload');

    const handleHelp = () => navigateTo('nearby_care');

    const handleReset = () => {
        setView('landing');
        setResults([]);
        setExtractedSymptoms([]);
        setImageAnalysisData(null);
        setInitialSymptoms('');
        setHistory(['landing']);
        setError(null);
    };

    const handleAnalyzeImageResult = (data) => {
        setImageAnalysisData(data);
        navigateTo('image_results');
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
            navigateTo('results');
        } catch (err) {
            console.error("Analysis failed:", err);
            setError(err.response?.data?.detail || "Connection error. Make sure the backend is running on port 8000.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col font-sans relative bg-black text-slate-200`}>
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
                        radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
                        radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
                    `,
                }}
            />

            <main className={`flex-grow container mx-auto px-4 py-6 md:py-8 relative z-10 transition-all duration-500 ${view === 'landing' ? 'pt-24 md:pt-32' : view === 'unified_hub' ? 'pt-4 md:pt-8' : 'pt-10'}`}>
                {error && (
                    <div className="max-w-3xl mx-auto w-full mt-6 px-4">
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center space-x-3 text-rose-700">
                            <span className="font-bold flex-shrink-0">Error:</span>
                            <p className="text-sm">{error}</p>
                            <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-rose-600">×</button>
                        </div>
                    </div>
                )}

                {view === 'landing' && (
                    <>
                        <Header isDark={true} />
                        <div className="sticky top-0 z-40 pointer-events-none mb-4 pt-4">
                            <Disclaimer variant="full" />
                        </div>
                        <LandingPage onStart={handleStart} />
                        <footer className="border-t border-slate-800 py-8 px-6 relative z-10 bg-transparent mt-20">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs text-center md:text-left">
                                <p>© 2026 HealthCheck AI Hackathon Project. For demo purposes only.</p>
                                <div className="flex space-x-6 mt-4 md:mt-0">
                                    <a href="#" className="hover:text-primary-400 underline transition-colors">Privacy Policy</a>
                                    <a href="#" className="hover:text-primary-400 underline transition-colors">Terms of Service</a>
                                    <a href="#" className="hover:text-primary-400 underline transition-colors">Help Center</a>
                                </div>
                            </div>
                        </footer>
                    </>
                )}

                {view === 'unified_hub' && (
                    <UnifiedHub
                        availableSymptoms={availableSymptoms}
                        loading={loading}
                        onAnalyze={handleAnalyze}
                        onStartImage={handleStartImage}
                        onBack={navigateBack}
                    />
                )}

                {view === 'form' && (
                    <SymptomForm
                        availableSymptoms={availableSymptoms}
                        onSubmit={handleAnalyze}
                        loading={loading}
                        onBack={navigateBack}
                        initialText={initialSymptoms}
                    />
                )}

                {view === 'results' && (
                    <PredictionResults
                        results={results}
                        symptoms={extractedSymptoms}
                        onReset={handleReset}
                        onBack={navigateBack}
                        onHelp={handleHelp}
                    />
                )}

                {view === 'image_upload' && (
                    <ImageUpload
                        onAnalyzeResult={handleAnalyzeImageResult}
                        onBack={navigateBack}
                        onError={setError}
                    />
                )}

                {view === 'image_results' && (
                    <ImageAnalysisResult
                        result={imageAnalysisData}
                        onReset={handleReset}
                        onBack={navigateBack}
                        onHelp={handleHelp}
                    />
                )}

                {view === 'nearby_care' && (
                    <NearbyCare
                        onBack={navigateBack}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
