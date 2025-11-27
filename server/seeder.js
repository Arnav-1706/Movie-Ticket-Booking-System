const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');
const User = require('./models/User');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Movie.deleteMany();
        await Theatre.deleteMany();
        await Show.deleteMany();
        await User.deleteMany();

        const movies = await Movie.insertMany([
            {
                title: 'Inception',
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                genre: ['Sci-Fi', 'Action'],
                language: 'English',
                duration: 148,
                posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7admal4zl248sK49u9i46qCM.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
                rating: 8.8,
                releaseDate: new Date('2010-07-16')
            },
            {
                title: 'Interstellar',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                genre: ['Sci-Fi', 'Adventure'],
                language: 'English',
                duration: 169,
                posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
                rating: 8.6,
                releaseDate: new Date('2014-11-07')
            },
            {
                title: 'The Dark Knight',
                description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                genre: ['Action', 'Crime'],
                language: 'English',
                duration: 152,
                posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7ZAc4I.jpg',
                rating: 9.0,
                releaseDate: new Date('2008-07-18')
            }
        ]);

        const theatres = await Theatre.insertMany([
            {
                name: 'PVR Icon: Phoenix Palladium',
                location: 'Mumbai',
                address: 'Lower Parel, Mumbai',
                facilities: ['Dolby Atmos', 'IMAX', 'Recliner']
            },
            {
                name: 'INOX: R-City',
                location: 'Mumbai',
                address: 'Ghatkopar, Mumbai',
                facilities: ['Dolby 7.1', 'Insignia']
            },
            {
                name: 'PVR: Select City Walk',
                location: 'Delhi',
                address: 'Saket, New Delhi',
                facilities: ['Gold Class', 'IMAX']
            }
        ]);

        // Create seat layout
        const generateSeats = () => {
            const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            const seats = [];
            rows.forEach(row => {
                for (let i = 1; i <= 10; i++) {
                    seats.push({
                        id: `${row}${i}`,
                        status: 'available',
                        type: row === 'H' ? 'premium' : 'standard' // Last row is premium
                    });
                }
            });
            return seats;
        };

        const shows = [];

        // Create shows for each movie in each theatre
        // For simplicity, create 2 shows per movie per theatre
        for (const movie of movies) {
            for (const theatre of theatres) {
                // Show 1: Today at 6 PM
                const show1Time = new Date();
                show1Time.setHours(18, 0, 0, 0);

                shows.push({
                    movie: movie._id,
                    theatre: theatre._id,
                    startTime: show1Time,
                    price: 250,
                    seats: generateSeats()
                });

                // Show 2: Tomorrow at 9 PM
                const show2Time = new Date();
                show2Time.setDate(show2Time.getDate() + 1);
                show2Time.setHours(21, 0, 0, 0);

                shows.push({
                    movie: movie._id,
                    theatre: theatre._id,
                    startTime: show2Time,
                    price: 300,
                    seats: generateSeats()
                });
            }
        }

        await Show.insertMany(shows);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
