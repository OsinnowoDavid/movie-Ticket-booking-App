import request from 'supertest';
import express from 'express';
import comingMoviesRoutes from '../routes/comingsoonRoute.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api', comingMoviesRoutes);

describe('Coming Soon Movies API', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/movie-ticket-app-test`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should add a new movie', async () => {
        const response = await request(app)
            .post('/api/addcomingmovies')
            .field('movieName', 'Test Movie')
            .field('moviesWatchingDate', '2023-12-31')
            .field('MovieDescription', 'Test Description')
            .attach('moviePicture', 'path/to/test/image.jpg'); // Ensure this path is correct

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'movie added successfully');
        expect(response.body).toHaveProperty('success', true);
    });
});
