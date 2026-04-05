import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Camera, Sparkles, Search, X, Plus, Info } from 'lucide-react';

const UnifiedHub = ({ onAnalyze, onStartImage, onBack, availableSymptoms = [], loading }) => {
    const [text, setText] = useState('');
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');

    const greeting = useMemo(() => {
        const options = [
            "How can I help you today?",
            "How are you feeling right now?",
            "Let's check your symptoms together.",
            "Ready for a health assessment?",
            "Tell me what's bothering you.",
            "Describe what you're experiencing.",
            "How can I assist your health journey?",
            "What symptoms are you noticing?"
        ];
        return options[Math.floor(Math.random() * options.length)];
    }, []);

    const handleToggleSymptom = (symptom) => {
        if (selected.includes(symptom)) {
            setSelected(selected.filter(s => s !== symptom));
        } else {
            setSelected([...selected, symptom]);
        }
    };

    const filteredSymptoms = availableSymptoms.filter(s =>
        s.toLowerCase().includes(search.toLowerCase()) && !selected.includes(s)
    ).slice(0, 8);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() && selected.length === 0) return;
        onAnalyze({ text, selected });
    };

    return (
        <div className="max-w-4xl mx-auto w-full pt-10 pb-10 px-4 flex flex-col items-center relative min-h-[calc(100vh-80px)]">
            {/* Back Button - Moved closer to the corner */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center text-slate-400 hover:text-white group transition-colors z-50 rounded-full bg-slate-900/40 p-1 md:p-0 backdrop-blur-sm md:bg-transparent"
            >
                <div className="bg-slate-800/50 p-2 rounded-full mr-3 border border-slate-700/50 group-hover:border-primary-500 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="font-medium hidden sm:inline">Back to Home</span>
            </button>

            {/* Hub Header */}
            <div className="text-center mb-4 md:mb-6">
                <div className="inline-flex items-center space-x-2 bg-primary-900/30 px-3 py-1 rounded-full mb-3 md:mb-4 border border-primary-800/50 shadow-sm transition-all duration-300">
                    <Sparkles className="w-4 h-4 text-primary-400" />
                    <span className="text-[10px] md:text-xs font-bold text-primary-400 uppercase tracking-wider">AI Diagnostic Engine</span>
                </div>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 transition-all duration-300">{greeting}</h2>
                <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed px-4 md:px-0">
                    Choose your method of analysis. You can describe your symptoms in detail or upload a medical photo.
                </p>
            </div>

            {/* Unified Interaction Box */}
            <div className="w-full max-w-3xl">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-5 md:p-8 transform transition-all relative overflow-hidden group">
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

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">How do you feel?</label>
                            <textarea
                                className="w-full h-32 p-4 rounded-2xl border border-slate-700/50 bg-slate-800/40 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none text-slate-200 placeholder:text-slate-500"
                                placeholder="Example: I have a high fever, a bad headache, and I'm feeling very weak..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3">Or select symptoms</label>

                            {/* Selected Chips */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selected.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => handleToggleSymptom(s)}
                                        className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 hover:bg-primary-700 transition-colors shadow-sm"
                                    >
                                        <span>{s}</span>
                                        <X className="w-3 h-3" />
                                    </button>
                                ))}
                                {selected.length === 0 && (
                                    <p className="text-xs text-slate-400 italic">No symptoms selected yet.</p>
                                )}
                            </div>

                            {/* Search and Selection */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Plus className="h-4 w-4 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-700/50 rounded-xl leading-5 bg-slate-800/30 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 sm:text-xs transition-all text-slate-200"
                                    placeholder="Search symptoms (e.g. fever, cough...)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {filteredSymptoms.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => handleToggleSymptom(s)}
                                        className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium hover:border-primary-300 hover:text-primary-600 transition-all opacity-80 hover:opacity-100"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-2 text-slate-400">
                                <Info className="w-4 h-4" />
                                <span className="text-xs">Multiple symptoms improve accuracy</span>
                            </div>

                            <div className="flex items-center space-x-2 md:space-x-3 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={onStartImage}
                                    className="p-3 md:p-4 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-700/40 rounded-2xl transition-all group/btn border border-white/5 flex-shrink-0"
                                    title="Upload Medical Image"
                                >
                                    <Camera className="w-5 md:w-6 h-5 md:h-6 transition-transform group-hover/btn:scale-110" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || (!text.trim() && selected.length === 0)}
                                    className={`flex-grow sm:flex-grow-0 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center space-x-2 ${loading || (!text.trim() && selected.length === 0)
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/20 active:scale-95'
                                        }`}
                                >
                                    <span className="text-sm md:text-base">{loading ? 'Analyzing...' : 'Analyze Symptoms 😊'}</span>
                                    {!loading && <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Animation Styles */}
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

export default UnifiedHub;
