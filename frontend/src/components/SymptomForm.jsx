import React, { useState, useEffect } from 'react';
import { Search, X, Plus, Info } from 'lucide-react';

const SymptomForm = ({ onSubmit, availableSymptoms, loading }) => {
    const [text, setText] = useState('');
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
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 transform transition-all">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                        <Search className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Describe what you're feeling</h2>
                        <p className="text-slate-500 text-sm">Tell us your symptoms in plain English or select them below.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">How do you feel?</label>
                        <textarea
                            className="w-full h-32 p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                            placeholder="Example: I have a high fever, a bad headache, and I'm feeling very weak..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Or select symptoms</label>

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
                                <Plus className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 sm:text-xs transition-all"
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
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200'
                                }`}
                        >
                            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SymptomForm;
