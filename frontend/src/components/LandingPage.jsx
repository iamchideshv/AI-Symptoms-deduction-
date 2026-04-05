import React from 'react';
import { ArrowRight, HeartPulse } from 'lucide-react';

const LandingPage = ({ onStart }) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 max-w-full mx-auto text-center relative">
            <div className="relative z-10 w-full max-w-7xl mx-auto py-20 md:py-0">
                <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full mb-6 border border-slate-800 shadow-sm">
                    <HeartPulse className="w-4 h-4 text-primary-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Healthcare AI Demo</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-6 leading-tight px-4 md:px-0 animate-pop-in">
                    Precision-driven health <br />
                    <span className="text-primary-400 animate-glow-pulse">insights at your fingertips.</span>
                </h1>

                <p className="mt-4 font-normal text-sm md:text-base text-neutral-300 max-w-lg text-center mx-auto mb-10 md:mb-16 leading-relaxed px-6 md:px-0">
                    Describe your symptoms in plain English or upload a photo for instant AI analysis. Experience the future of diagnostic health.
                </p>

                <div className="flex justify-center mb-12 md:mb-20 px-4">
                    <button
                        onClick={onStart}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-[2rem] font-bold text-lg md:text-xl flex items-center justify-center space-x-3 transition-all transform hover:scale-105 shadow-2xl shadow-primary-500/30 active:scale-95 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        <span>Check Yourself 😊</span>
                        <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
