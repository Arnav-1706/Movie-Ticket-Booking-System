import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const regions = [
    { id: 'mumbai', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80' },
    { id: 'delhi', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
    { id: 'bangalore', name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80' },
    { id: 'hyderabad', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1570795876989-bcec725b8e72?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const Home = () => {
    const navigate = useNavigate();

    const selectRegion = (region) => {
        localStorage.setItem('region', region);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    Welcome to MovieTix
                </h1>
                <p className="text-gray-400 text-lg">Select your region to discover movies near you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
                {regions.map((region) => (
                    <div
                        key={region.id}
                        onClick={() => selectRegion(region.name)}
                        className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <img
                            src={region.image}
                            alt={region.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <MapPin className="w-5 h-5 text-red-500" />
                                {region.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
