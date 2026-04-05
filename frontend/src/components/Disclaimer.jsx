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
        <div className="w-full py-2 px-6 flex justify-center">
            <div className="max-w-4xl w-auto bg-slate-900/60 backdrop-blur-md border border-white/10 py-2 px-8 rounded-full flex items-center justify-center space-x-3 shadow-2xl pointer-events-auto relative overflow-hidden group">
                {/* Border Beam Shine Effect */}
                <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                        padding: '1px',
                        background: 'conic-gradient(from var(--angle), transparent 70%, #f59e0b 85%, #fbbf24 95%, transparent 100%)',
                        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'destination-out',
                        animation: 'rotate-shine 4s linear infinite',
                    }}
                />

                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 relative z-10" />
                <p className="text-[10px] md:text-sm font-medium text-slate-200 relative z-10">
                    <span className="font-bold text-amber-500 uppercase tracking-tighter mr-1">Medical Disclaimer:</span> This is an AI demo. Predictions are not accurate diagnoses. Always consult a licensed doctor.
                </p>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @property --angle {
                        syntax: '<angle>';
                        initial-value: 0deg;
                        inherits: false;
                    }
                    @keyframes rotate-shine {
                        from { --angle: 0deg; }
                        to { --angle: 360deg; }
                    }
                ` }} />
            </div>
        </div>
    );
};

export default Disclaimer;
