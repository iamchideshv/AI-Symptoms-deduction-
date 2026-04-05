import React from 'react';
import { Activity } from 'lucide-react';

const Header = ({ isDark = false }) => {
    return (
        <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:w-[calc(100%-2.5rem)] max-w-6xl z-50 transition-all duration-500">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 py-3 md:py-4 px-5 md:px-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none" />
                <div className="flex items-center space-x-3">
                    <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/20">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white leading-tight">HealthCheck AI</h1>
                        <p className="text-xs text-slate-400">Intelligent Symptom Analysis</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</a>
                    <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How it works</a>
                    <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Safety</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
