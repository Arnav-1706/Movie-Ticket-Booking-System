# Movie Ticket Booking System

A full-stack movie ticket booking application built with React, Node.js, Express, and MongoDB.

## Features

- **Movie Browsing**: Browse movies by region.
- **Dashboard**: View recommended and now showing movies.
- **Movie Details**: View movie info, cast, and showtimes.
- **Seat Selection**: Interactive seat map with real-time availability.
- **Booking**: Book tickets and view booking summary.
- **User Profile**: View booking history.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Authentication**: JWT (Basic implementation).

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

### 1. Clone the repository

```bash
git clone <repository-url>
cd movie-booking-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie-booking-system
JWT_SECRET=your_jwt_secret
```

Seed the database:

```bash
node seeder.js
```

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

## API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/theatres` - Get theatres
- `GET /api/shows/movie/:movieId` - Get shows for a movie
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/user/:userId` - Get user bookings

## License

MIT
