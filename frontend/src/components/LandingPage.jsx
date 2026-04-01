import React from 'react';
import { ArrowRight, ShieldCheck, Zap, HeartPulse } from 'lucide-react';

const LandingPage = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-3 py-1 rounded-full mb-6 border border-primary-100 shadow-sm">
                <HeartPulse className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">Healthcare AI Demo</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Understand your health <br />
                <span className="text-primary-600">with precision.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Describe your symptoms in plain English or select from our list. Get an instant analysis of potential conditions and recommended next steps.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <button
                    onClick={onStart}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-primary-200"
                >
                    <span>Start Symptom Check</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold transition-all">
                    Learn How It Works
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left">
                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-800">Fast Analysis</h3>
                    <p className="text-sm text-slate-500">Get predictions in seconds powered by trained Random Forest models.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left">
                    <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-green-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-800">NLP Powered</h3>
                    <p className="text-sm text-slate-500">Extracts relevant symptoms from your natural speech or text input.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left">
                    <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-800">Care Guidance</h3>
                    <p className="text-sm text-slate-500">Receive urgency levels and basic precautions for each prediction.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
