import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Calendar, Clock, MapPin, Star, Play } from 'lucide-react';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const region = localStorage.getItem('region') || 'Mumbai';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieRes = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(movieRes.data);

                const showsRes = await axios.get(`http://localhost:5000/api/shows/movie/${id}?region=${region}`);
                setShows(showsRes.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, region]);

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    if (!movie) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Movie not found</div>;

    // Group shows by theatre
    const showsByTheatre = shows.reduce((acc, show) => {
        const theatreId = show.theatre._id;
        if (!acc[theatreId]) {
            acc[theatreId] = {
                theatre: show.theatre,
                shows: []
            };
        }
        acc[theatreId].shows.push(show);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[50vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10" />
                <img
                    src={movie.backdropUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 container mx-auto flex gap-8 items-end">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-48 rounded-xl shadow-2xl block z-30"
                        referrerPolicy="no-referrer"
                    />
                    <div className="mb-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                            <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-yellow-400 font-bold">
                                <Star className="w-4 h-4 fill-current" /> {movie.rating}
                            </span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movie.duration}m</span>
                            <span className="bg-gray-800 px-3 py-1 rounded-full">{movie.language}</span>
                            {movie.genre.map(g => (
                                <span key={g} className="bg-gray-800 px-3 py-1 rounded-full">{g}</span>
                            ))}
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition">
                            <Play className="w-5 h-5 fill-current" /> Watch Trailer
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: About & Cast */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">About the Movie</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">{movie.description}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Theatres & Showtimes</h2>
                            <div className="space-y-6">
                                {Object.values(showsByTheatre).length === 0 ? (
                                    <p className="text-gray-400">No shows available in {region}.</p>
                                ) : (
                                    Object.values(showsByTheatre).map(({ theatre, shows }) => (
                                        <div key={theatre._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        {theatre.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                                                        <MapPin className="w-3 h-3" /> {theatre.address}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {theatre.facilities.map(f => (
                                                        <span key={f} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{f}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4">
                                                {shows.map(show => (
                                                    <button
                                                        key={show._id}
                                                        onClick={() => navigate(`/booking/${show._id}`)}
                                                        className="px-6 py-2 rounded border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition font-medium"
                                                    >
                                                        {new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Offers/Ads */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">Bank Offer</h3>
                            <p className="text-purple-200 text-sm mb-4">Get 20% off on HDFC Credit Cards up to ₹100.</p>
                            <button className="text-sm font-bold bg-white text-purple-900 px-4 py-2 rounded">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
