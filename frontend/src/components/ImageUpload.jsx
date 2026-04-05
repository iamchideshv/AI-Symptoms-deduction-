import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ImageUpload = ({ onAnalyzeResult, onBack }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type.startsWith('image/')) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setError(null);
        } else {
            setError("Please select a valid image file.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selected = e.dataTransfer.files[0];
        if (selected && selected.type.startsWith('image/')) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setError(null);
        } else {
            setError("Please drop a valid image file.");
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        if (question.trim()) {
            formData.append('question', question.trim());
        }

        try {
            const response = await axios.post('http://localhost:8000/api/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onAnalyzeResult(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to analyze image. Ensure the backend is running and Gemini API key is configured.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full px-4 mb-16 relative z-10">
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
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 p-6 md:p-12 text-white relative overflow-hidden group">
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

                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent mb-6 relative z-10">Visual Analysis</h2>
                <p className="text-slate-400 mb-8 max-w-xl relative z-10">
                    Upload a clear photo of your skin condition, rash, or allergy for immediate AI identification and remedies.
                </p>

                {error && (
                    <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center space-x-3 text-rose-700 mb-6">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {!preview ? (
                    <div
                        className="border-2 border-dashed border-white/10 rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center text-center hover:border-primary-500/50 hover:bg-slate-800/20 transition-colors cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="bg-primary-900/40 p-3 md:p-4 rounded-full mb-3 md:mb-4 text-primary-400 group-hover:bg-primary-800/40 transition-colors">
                            <UploadCloud size={28} className="md:w-8 md:h-8" />
                        </div>
                        <h3 className="font-semibold text-base md:text-lg text-white mb-1 md:mb-2 text-balance">Click to upload or drag & drop</h3>
                        <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 md:gap-8 lg:flex-row">
                        <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-slate-800/40 order-1">
                            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                            <button
                                onClick={clearFile}
                                className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-800 shadow-sm transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 order-2">
                            <div className="flex items-start space-x-3 text-slate-300 bg-slate-800/40 p-4 rounded-2xl border border-white/5">
                                <ImageIcon size={20} className="text-primary-400 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
                                <div className="min-w-0">
                                    <p className="text-xs md:text-sm font-medium text-white">Image Ready</p>
                                    <p className="text-[10px] md:text-xs text-slate-500 truncate">{file.name}</p>
                                </div>
                            </div>

                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ask a specific question (optional)..."
                                className="w-full p-4 rounded-2xl border border-white/10 text-xs md:text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm resize-none bg-slate-800/40 text-white placeholder:text-slate-500 h-24 md:h-32"
                                rows="3"
                            />

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className={`w-full py-3 md:py-4 px-6 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center text-sm md:text-base ${loading
                                    ? 'bg-slate-800 text-slate-600 shadow-none cursor-not-allowed border border-white/5'
                                    : 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:shadow-primary-500/25 hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Image...
                                    </>
                                ) : (
                                    'Analyze Image'
                                )}
                            </button>
                        </div>
                    </div>
                )}
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

export default ImageUpload;
