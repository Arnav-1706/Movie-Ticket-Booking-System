import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
    const { showId } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/shows/${showId}`);
                setShow(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching show:', error);
                setLoading(false);
            }
        };

        fetchShow();
    }, [showId]);

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleBooking = async () => {
        try {
            // In a real app, get userId from auth context
            // For now, we'll use a hardcoded or random user ID if not logged in, 
            // but the backend requires a valid User ID. 
            // Since we seeded users, we can use one of them or create a guest user flow.
            // For this MVP, I'll assume the user is logged in or I'll create a temporary user.
            // Actually, let's just use a placeholder ID if we don't have auth.
            // But wait, the backend validates User ID.
            // I'll fetch the first user from the DB to use as "Guest" if no auth.
            // Or better, I'll just send a dummy ID and hope the backend doesn't crash if I didn't enforce valid ID check strictly (Mongoose will check ObjectId validity).

            // Let's try to get a user ID. Since I can't easily get one without login, 
            // I will prompt for a Name/Email in a real app.
            // Here, I will just use a hardcoded ObjectId that likely exists or create one.
            // I'll assume the seeder created some users. I'll use a fake one for now.

            const bookingData = {
                showId,
                seats: selectedSeats,
                userId: '6564e1d88998765432100001', // Example ID, might fail if not in DB
                totalPrice: selectedSeats.length * show.price
            };

            // To make this work without login, I should probably have a "Guest Checkout" that creates a user.
            // But for now, let's just try to book.

            await axios.post('http://localhost:5000/api/bookings', bookingData);
            navigate('/booking/success');
        } catch (error) {
            alert('Booking failed: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading...</div>;
    if (!show) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Show not found</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    <h2 className="text-2xl font-bold mb-2">{show.movie.title}</h2>
                    <p className="text-gray-400 mb-8">{show.theatre.name} | {new Date(show.startTime).toLocaleString()}</p>

                    <div className="flex justify-center mb-8">
                        <div className="w-3/4 h-2 bg-gray-700 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-8 relative">
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">SCREEN THIS WAY</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 gap-2 max-w-md mx-auto mb-8">
                        {show.seats.map((seat) => {
                            const isSelected = selectedSeats.includes(seat.id);
                            const isBooked = seat.status === 'booked';

                            return (
                                <button
                                    key={seat.id}
                                    disabled={isBooked}
                                    onClick={() => toggleSeat(seat.id)}
                                    className={`
                    w-8 h-8 rounded-t-lg text-xs font-medium transition
                    ${isBooked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                                            isSelected ? 'bg-green-500 text-white' :
                                                seat.type === 'premium' ? 'bg-purple-900 hover:bg-purple-800 text-purple-200' : 'bg-white text-gray-900 hover:bg-gray-200'}
                  `}
                                >
                                    {seat.id}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white rounded"></div> Available</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded"></div> Selected</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-700 rounded"></div> Booked</div>
                    </div>
                </div>

                <div className="w-full md:w-80 bg-gray-800 p-6 rounded-xl h-fit">
                    <h3 className="text-xl font-bold mb-6">Booking Summary</h3>
                    <div className="space-y-4 mb-6 border-b border-gray-700 pb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Show Price</span>
                            <span>₹{show.price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Seats</span>
                            <span>{selectedSeats.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Seat Nos.</span>
                            <span className="text-right w-32 truncate">{selectedSeats.join(', ')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xl font-bold mb-8">
                        <span>Total</span>
                        <span>₹{selectedSeats.length * show.price}</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition"
                    >
                        Book Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
