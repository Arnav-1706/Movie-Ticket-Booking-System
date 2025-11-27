import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import BookingSuccess from './pages/BookingSuccess';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/booking/:showId" element={<SeatSelection />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
