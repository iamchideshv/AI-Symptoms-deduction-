import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = ({ variant = 'full' }) => {
    if (variant === 'mini') {
        return (
            <div className="flex items-start space-x-2 text-xs text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p>
                    Educational only. Not a medical diagnosis. In an emergency, call 911 or visit the nearest ER.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-amber-50 border-y border-amber-100 py-3 px-6">
            <div className="max-w-6xl mx-auto flex items-center justify-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm font-medium text-amber-800">
                    <span className="font-bold">Medical Disclaimer:</span> This is an AI demo for hackathon purposes. Predictions are not accurate diagnoses. Always consult a licensed doctor for health concerns.
                </p>
            </div>
        </div>
    );
};

export default Disclaimer;
