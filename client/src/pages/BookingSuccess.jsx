import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-2xl text-center max-w-md w-full border border-gray-700">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-gray-400 mb-8">Your tickets have been successfully booked. Check your email for details.</p>

                <div className="space-y-4">
                    <Link to="/dashboard" className="block w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition">
                        Book Another Movie
                    </Link>
                    <Link to="/" className="block w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-bold transition">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
