import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold text-red-500 tracking-tighter">
                    MovieTix
                </Link>
                <div className="hidden md:flex gap-6 text-gray-300 text-sm font-medium ml-8">
                    <Link to="/" className="hover:text-white transition">Movies</Link>
                    <Link to="/theatres" className="hover:text-white transition">Theatres</Link>
                    <Link to="/events" className="hover:text-white transition">Events</Link>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        className="bg-gray-800 text-sm rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm font-medium transition">
                        Sign In
                    </button>
                    <Menu className="w-6 h-6 md:hidden cursor-pointer" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
