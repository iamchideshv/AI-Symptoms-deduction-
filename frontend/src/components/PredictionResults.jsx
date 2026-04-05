import { Activity, Shield, ArrowLeft, RefreshCw, AlertCircle, ChevronRight, AlertTriangle } from 'lucide-react';

const PredictionResults = ({ results, symptoms, onReset, onBack, onHelp }) => {
    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'High': return 'bg-rose-500';
            case 'Medium': return 'bg-amber-500';
            case 'Low': return 'bg-emerald-500';
            default: return 'bg-slate-500';
        }
    };

    const getUrgencyBg = (urgency) => {
        switch (urgency) {
            case 'High': return 'bg-rose-500/10 border-rose-500/30 text-rose-300';
            case 'Medium': return 'bg-amber-500/10 border-amber-500/30 text-amber-300';
            case 'Low': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
            default: return 'bg-slate-500/10 border-slate-500/30 text-slate-300';
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full py-10 px-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous Step</span>
                    </button>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Your Assessment Results</h2>
                </div>
                <div className="flex flex-wrap gap-2 transition-all duration-300">
                    {symptoms.map(s => (
                        <span key={s} className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold border border-slate-700/50">
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative group">
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

                        <div className="p-4 md:p-6 border-b border-white/5 flex items-center space-x-2 relative z-10">
                            <Activity className="w-5 h-5 text-primary-400" />
                            <h3 className="font-bold text-white text-sm md:text-base">Top Likely Conditions</h3>
                        </div>

                        <div className="divide-y divide-white/5 relative z-10">
                            {results.length > 0 ? results.map((res, index) => (
                                <div key={res.disease} className="p-6 hover:bg-white/5 transition-colors group">
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4 sm:gap-0">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-1">
                                                <span className="text-slate-500 font-mono text-sm leading-none">{index + 1}.</span>
                                                <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                                                    {res.disease}
                                                </h4>
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-400 line-clamp-2 max-w-lg">
                                                {res.description}
                                            </p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border whitespace-nowrap ${getUrgencyBg(res.urgency)}`}>
                                            {res.urgency} Urgency
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                            <span>Match Confidence</span>
                                            <span>{res.confidence}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${getUrgencyColor(res.urgency)}`}
                                                style={{ width: `${res.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    {index === 0 && (
                                        <div className="mt-6 bg-primary-950/30 rounded-2xl p-4 border border-primary-500/20">
                                            <h5 className="text-xs md:text-sm font-bold text-primary-300 mb-2 flex items-center space-x-2">
                                                <Shield className="w-4 h-4" />
                                                <span>Recommended Next Step</span>
                                            </h5>
                                            <p className="text-primary-200 text-xs md:text-sm leading-relaxed italic">
                                                - {res.advice}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {res.precautions.map(p => (
                                                    <span key={p} className="bg-white/5 text-[10px] md:text-xs text-primary-300 px-2 md:px-2.5 py-1 rounded-lg border border-primary-500/20">
                                                        ✓ {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div className="p-12 text-center">
                                    <RefreshCw className="w-12 h-12 text-slate-200 mx-auto mb-4 animate-spin" />
                                    <p className="text-slate-400">Analysis incomplete...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={onHelp}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white p-6 rounded-3xl font-bold flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-rose-500/20 active:scale-95 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        <AlertTriangle className="w-6 h-6" />
                        <span className="text-lg">Helps 😣</span>
                    </button>

                    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 text-white border border-white/5 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                            <h3 className="font-bold text-lg">Safety First</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            This assessment is for informational purposes. AI models can make errors and miss critical symptoms.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 text-xs bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                                <div className="bg-amber-500 w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                                <p className="text-amber-200/80">If you experience chest pain, shortness of breath, or bleeding, seek <span className="font-bold text-amber-500 underline">emergency care</span> immediately.</p>
                            </div>
                            <div className="flex items-start space-x-3 text-xs bg-white/5 p-3 rounded-xl text-slate-400 border border-white/5">
                                <div className="bg-slate-600 w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                                <p>Always share this report with your healthcare provider for an official diagnosis.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onReset}
                        className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-left hover:border-primary-500/50 transition-all group"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-white">Start Over</h4>
                                <p className="text-xs text-slate-500">Reset and enter new symptoms</p>
                            </div>
                            <div className="bg-slate-800/50 w-10 h-10 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </button>
                </div>
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

export default PredictionResults;
