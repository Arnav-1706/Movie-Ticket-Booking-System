import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Star, Clock, Calendar } from 'lucide-react';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const region = localStorage.getItem('region') || 'Mumbai';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // In a real app, pass region as query param
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies`);
                setMovies(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Now Showing in {region}</h2>
                        <p className="text-gray-400">Book tickets for the latest blockbusters</p>
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Action', 'Sci-Fi', 'Drama'].map(genre => (
                            <button key={genre} className="px-4 py-1.5 rounded-full border border-gray-700 hover:border-red-500 hover:text-red-500 text-sm transition">
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {movies.map((movie) => (
                            <Link to={`/movie/${movie._id}`} key={movie._id} className="group">
                                <div className="relative rounded-xl overflow-hidden aspect-[2/3] mb-4">
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold text-yellow-400">
                                        <Star className="w-3 h-3 fill-current" />
                                        {movie.rating}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition">{movie.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}m</span>
                                    <span>{movie.language}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
