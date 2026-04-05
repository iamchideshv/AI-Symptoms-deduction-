import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Navigation, Clock, Activity, User, AlertTriangle, Loader2 } from 'lucide-react';

const NearbyCare = ({ onBack }) => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const getGeoLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        // Simulate API call to find nearby places based on coordinates
                        setTimeout(() => {
                            generateMockFacilities(latitude, longitude);
                            setLoading(false);
                        }, 2000);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        // Fallback to default mock data if denied
                        generateMockFacilities(0, 0);
                        setLoading(false);
                    }
                );
            } else {
                generateMockFacilities(0, 0);
                setLoading(false);
            }
        };

        getGeoLocation();
    }, []);

    const generateMockFacilities = (lat, lng) => {
        // Mock data that looks real for a demo
        const mockData = [
            {
                id: 1,
                name: "City Central General Hospital",
                type: "Hospital",
                distance: "1.2 km",
                rating: 4.8,
                reviews: 1240,
                status: "Open 24/7",
                phone: "+1 (555) 012-3456",
                emergency: true,
                address: "450 Medical Plaza, Healthcare District"
            },
            {
                id: 2,
                name: "Dr. Sarah Mitchell - Dermatology Clinic",
                type: "Specialist",
                distance: "2.4 km",
                rating: 4.9,
                reviews: 512,
                status: "Closes at 6:00 PM",
                phone: "+1 (555) 012-7890",
                emergency: false,
                address: "Suite 201, Wellness Towers"
            },
            {
                id: 3,
                name: "UrgentCare Plus Express",
                type: "Clinic",
                distance: "0.8 km",
                rating: 4.5,
                reviews: 890,
                status: "Open: Wait time 15m",
                phone: "+1 (555) 012-1111",
                emergency: true,
                address: "88 Retail Blvd, North Wing"
            },
            {
                id: 4,
                name: "Community Health Center",
                type: "Clinic",
                distance: "3.5 km",
                rating: 4.2,
                reviews: 320,
                status: "Closed - Opens 8 AM",
                phone: "+1 (555) 012-2222",
                emergency: false,
                address: "12 Valley Rd, West District"
            },
            {
                id: 5,
                name: "Apollo Medical Research Institute",
                type: "Hospital",
                distance: "5.1 km",
                rating: 4.7,
                reviews: 2100,
                status: "Open 24/7",
                phone: "+1 (555) 012-9999",
                emergency: true,
                address: "100 Innovation Way"
            }
        ];
        setFacilities(mockData);
    };

    return (
        <div className="max-w-4xl mx-auto w-full py-10 px-4 flex flex-col items-center animate-fade-in relative z-10">
            {/* Header / Back */}
            <div className="w-full mb-8 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center text-slate-400 hover:text-white group transition-colors"
                >
                    <div className="bg-slate-800/50 p-2 rounded-full mr-3 border border-slate-700/50 group-hover:border-primary-500 transition-colors">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-medium">Back to Results</span>
                </button>
                <div className="flex items-center space-x-2 text-primary-400 bg-primary-950/30 px-4 py-1.5 rounded-full border border-primary-500/20 shadow-sm">
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Nearby Medical Assistance</span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                    <p className="text-slate-400 font-medium animate-pulse">Locating nearby facilities...</p>
                </div>
            ) : (
                <div className="w-full space-y-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nearby Professional Care</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Based on your assessment, we found these highly-rated providers in your area. Contact them for a professional diagnosis.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pb-20">
                        {facilities.map((facility) => (
                            <div
                                key={facility.id}
                                className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-6 hover:bg-slate-800/40 transition-all group overflow-hidden relative"
                            >
                                {/* Category Badge */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-3 rounded-2xl ${facility.type === 'Hospital' ? 'bg-rose-500/10 text-rose-400' : 'bg-primary-500/10 text-primary-400'}`}>
                                            {facility.type === 'Hospital' ? <Activity className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">{facility.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{facility.type} • {facility.distance} away</p>
                                        </div>
                                    </div>
                                    {facility.emergency && (
                                        <div className="bg-rose-500/20 text-rose-400 p-2 rounded-xl border border-rose-500/20 animate-pulse">
                                            <AlertTriangle className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-2 text-slate-400">
                                        <MapPin className="w-4 h-4 shrink-0" />
                                        <span className="text-sm line-clamp-1">{facility.address}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="text-sm font-bold text-white">{facility.rating}</span>
                                            <span className="text-xs text-slate-500">({facility.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-xs font-medium text-emerald-400">{facility.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <a
                                        href={`tel:${facility.phone}`}
                                        className="flex-grow bg-slate-800/50 hover:bg-slate-700/50 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 border border-white/5 transition-all"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span>Call Now</span>
                                    </a>
                                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary-500/20">
                                        Directions
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                    }
                ` }} />
        </div>
    );
};

export default NearbyCare;
