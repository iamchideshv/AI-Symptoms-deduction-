import React from 'react';
import { Activity, Shield, ArrowLeft, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react';

const PredictionResults = ({ results, symptoms, onReset }) => {
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
            case 'High': return 'bg-rose-50 border-rose-100 text-rose-700';
            case 'Medium': return 'bg-amber-50 border-amber-100 text-amber-700';
            case 'Low': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
            default: return 'bg-slate-50 border-slate-100 text-slate-700';
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full py-10 px-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={onReset}
                        className="flex items-center space-x-2 text-slate-500 hover:text-primary-600 transition-colors mb-2 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>New Assessment</span>
                    </button>
                    <h2 className="text-3xl font-bold text-slate-800">Your Assessment Results</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {symptoms.map(s => (
                        <span key={s} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold border border-slate-200">
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-primary-600" />
                            <h3 className="font-bold text-slate-800">Top Likely Conditions</h3>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {results.length > 0 ? results.map((res, index) => (
                                <div key={res.disease} className="p-6 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-1">
                                                <span className="text-slate-400 font-mono text-sm leading-none">{index + 1}.</span>
                                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                                                    {res.disease}
                                                </h4>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-2 max-w-lg">
                                                {res.description}
                                            </p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getUrgencyBg(res.urgency)}`}>
                                            {res.urgency} Urgency
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                            <span>Match Confidence</span>
                                            <span>{res.confidence}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${getUrgencyColor(res.urgency)}`}
                                                style={{ width: `${res.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    {index === 0 && (
                                        <div className="mt-6 bg-primary-50 rounded-2xl p-4 border border-primary-100">
                                            <h5 className="text-sm font-bold text-primary-800 mb-2 flex items-center space-x-2">
                                                <Shield className="w-4 h-4" />
                                                <span>Recommended Next Step</span>
                                            </h5>
                                            <p className="text-primary-700 text-sm leading-relaxed italic">
                                                - {res.advice}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {res.precautions.map(p => (
                                                    <span key={p} className="bg-white/50 text-xs text-primary-700 px-2.5 py-1 rounded-lg border border-primary-200/50">
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
                    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-amber-400" />
                            <h3 className="font-bold text-lg">Safety First</h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            This assessment is for informational purposes. AI models can make errors and miss critical symptoms.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 text-xs bg-white/10 p-3 rounded-xl">
                                <div className="bg-amber-400 w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                                <p className="text-white/80">If you experience chest pain, shortness of breath, or bleeding, seek <span className="font-bold text-white underline">emergency care</span> immediately.</p>
                            </div>
                            <div className="flex items-start space-x-3 text-xs bg-white/10 p-3 rounded-xl text-white/80">
                                <div className="bg-slate-400 w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                                <p>Always share this report with your healthcare provider for an official diagnosis.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onReset}
                        className="w-full bg-white border border-slate-200 p-6 rounded-3xl text-left hover:border-primary-200 transition-all group"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-slate-800">Start Over</h4>
                                <p className="text-xs text-slate-500">Reset and enter new symptoms</p>
                            </div>
                            <div className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PredictionResults;
