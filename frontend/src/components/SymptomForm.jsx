import React, { useState, useEffect } from 'react';
import { Search, X, Plus, Info, ArrowLeft } from 'lucide-react';

const SymptomForm = ({ onSubmit, availableSymptoms, loading, onBack, initialText = '' }) => {
    const [text, setText] = useState(initialText);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');

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
        onSubmit({ text, selected });
    };

    return (
        <div className="max-w-3xl mx-auto w-full py-10 px-4">
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center text-slate-400 hover:text-white mb-6 group transition-colors relative z-50 pointer-events-auto"
                    type="button"
                >
                    <div className="bg-slate-800/50 p-2 rounded-full mr-3 shadow-sm border border-slate-700/50 group-hover:border-primary-500 transition-colors">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-medium">Back to Home</span>
                </button>
            )}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 transform transition-all relative overflow-hidden group">
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

                <div className="flex items-center space-x-3 mb-6 relative z-10">
                    <div className="bg-primary-900/40 p-2 rounded-xl text-primary-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Describe what you're feeling</h2>
                        <p className="text-slate-400 text-sm">Tell us your symptoms in plain English or select them below.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium hover:border-primary-300 hover:text-primary-600 transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-slate-400">
                            <Info className="w-4 h-4" />
                            <span className="text-xs">Multiple symptoms improve accuracy</span>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || (!text.trim() && selected.length === 0)}
                            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${loading || (!text.trim() && selected.length === 0)
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/20'
                                }`}
                        >
                            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                        </button>
                    </div>
                </form>
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

export default SymptomForm;
