import { ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
        case 'high': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
        case 'medium': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
        case 'low': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
        default: return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
};

const getUrgencyIcon = (urgency) => {
    switch (urgency?.toLowerCase()) {
        case 'high': return <AlertTriangle size={20} className="text-rose-500" />;
        case 'medium': return <AlertTriangle size={20} className="text-amber-500" />;
        default: return <CheckCircle2 size={20} className="text-emerald-500" />;
    }
};

const ImageAnalysisResult = ({ result, onReset, onBack, onHelp }) => {
    if (!result) return null;

    return (
        <div className="max-w-3xl mx-auto w-full px-4 mb-20 animate-fade-in">
            <button
                onClick={onBack}
                className="flex items-center text-slate-400 hover:text-white mb-8 group transition-colors relative z-50 pointer-events-auto"
                aria-label="Back to Analysis"
            >
                <div className="bg-slate-800/50 p-2 rounded-full mr-3 shadow-sm border border-slate-700/50 group-hover:border-primary-500 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="font-medium">Previous Step</span>
            </button>

            <div className="space-y-6">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden text-white relative group">
                    {/* Border Beam Shine Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-[2.5rem]"
                        style={{
                            padding: '1.5px',
                            background: 'conic-gradient(from var(--angle), transparent 75%, #3b82f6 85%, #60a5fa 95%, transparent 100%)',
                            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'destination-out',
                            animation: 'rotate-shine 6s linear infinite',
                        }}
                    />

                    <div className="bg-gradient-to-br from-primary-950/40 to-indigo-950/40 p-8 md:p-10 border-b border-white/5 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="text-primary-400 font-semibold mb-2 flex items-center text-sm tracking-wide uppercase">
                                    AI Identification Complete
                                </p>
                                <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                    {result.condition_name}
                                </h2>
                            </div>

                            <div className={`px-5 py-3 rounded-2xl border flex items-center space-x-3 whitespace-nowrap shadow-sm ${getUrgencyColor(result.urgency)}`}>
                                {getUrgencyIcon(result.urgency)}
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-0.5">Urgency Level</p>
                                    <p className="font-bold text-sm">{result.urgency}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 space-y-10">
                        <section>
                            <h3 className="font-bold text-white mb-4 text-lg border-b border-white/5 pb-2">Description</h3>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                {result.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-white mb-4 text-lg border-b border-white/5 pb-2">Solutions & Advice</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.solutions?.map((solution, index) => (
                                    <li key={index} className="flex items-start space-x-3 bg-slate-800/40 p-4 rounded-2xl border border-white/5">
                                        <CheckCircle2 size={20} className="text-primary-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-400 text-sm leading-relaxed">{solution}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <div className="bg-rose-500/20 p-3 rounded-full flex-shrink-0 text-rose-400">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-rose-300 mb-1">Medical Disclaimer</h4>
                                <p className="text-sm text-rose-200/60 leading-relaxed">
                                    This AI analysis is for informational purposes only and does not constitute medical advice or a definitive diagnosis. Always consult a certified dermatologist or healthcare professional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onHelp}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white p-8 rounded-[2.5rem] font-bold flex items-center justify-center space-x-4 transition-all transform hover:scale-[1.02] shadow-xl shadow-rose-500/20 active:scale-95 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                    <AlertTriangle size={32} />
                    <span className="text-2xl tracking-tight">Helps 😣</span>
                </button>
            </div>

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
    );
};

export default ImageAnalysisResult;
