import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Ticket, Calendar, MapPin } from 'lucide-react';

const Profile = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = '6564e1d88998765432100001'; // Hardcoded for MVP

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
                setBookings(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : bookings.length === 0 ? (
                    <div className="text-gray-400">No bookings found.</div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-32 h-48 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={booking.show.movie.posterUrl}
                                        alt={booking.show.movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">{booking.show.movie.title}</h3>
                                            <p className="text-gray-400 flex items-center gap-1">
                                                <MapPin className="w-4 h-4" /> {booking.show.theatre.name}, {booking.show.theatre.location}
                                            </p>
                                        </div>
                                        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded text-sm font-bold border border-green-900">
                                            Confirmed
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-gray-700/50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-400 mb-1">Date & Time</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(booking.show.startTime).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-400 mb-1">Seats</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Ticket className="w-4 h-4" />
                                                {booking.seats.join(', ')}
                                            </p>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                                            <p className="font-medium">₹{booking.totalPrice}</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-400 mb-1">Booking ID</p>
                                            <p className="font-medium truncate" title={booking._id}>#{booking._id.slice(-6)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
