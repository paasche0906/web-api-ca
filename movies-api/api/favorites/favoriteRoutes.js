import express from 'express';
import FavoriteMovie from './favoriteModel';
import mongoose from 'mongoose';

const router = express.Router();

// Get the user's favourite movies
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await FavoriteMovie.find({ userId });
        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorite movies found for the specified user.' });
        }
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite movies', error: error.message });
    }
});

// Get all movies in your collection (paged)
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const favorites = await FavoriteMovie.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await FavoriteMovie.countDocuments();

        res.status(200).json({
            total: count,
            page: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            favorites
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite movies', error: error.message });
    }
});

// Add a favourite movie
router.post('/', async (req, res) => {
    const { userId, movieId, title, posterPath } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' });
    }

    if (!userId || !movieId || !title) {
        return res.status(400).json({ message: 'userId, movieId, and title are required' });
    }

    try {
        const favorite = new FavoriteMovie({ userId, movieId, title, posterPath });
        const savedFavorite = await favorite.save();
        res.status(201).json(savedFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite movie', error: error.message });
    }
});

// Delete the user's favourite movies
router.delete('/:userId/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        const deletedFavorite = await FavoriteMovie.findOneAndDelete({ userId, movieId });
        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorite movie not found.' });
        }
        res.status(200).json({ message: 'Favorite movie successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting favorite movie', error: error.message });
    }
});



export default router;
