import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-primary-500 p-2 rounded-lg">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 leading-tight">HealthCheck AI</h1>
                        <p className="text-xs text-slate-500">Intelligent Symptom Analysis</p>
                    </div>
                </div>
                <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
                    <a href="#" className="hover:text-primary-600 transition-colors">Home</a>
                    <a href="#" className="hover:text-primary-600 transition-colors">How it works</a>
                    <a href="#" className="hover:text-primary-600 transition-colors">Safety</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
