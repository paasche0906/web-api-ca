import express from 'express';
import FavoriteModel from './favoriteModel';

const router = express.Router();

// Get all favorites for a specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await FavoriteModel.find({ userId });
        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found for the specified user.' });
        }
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error: error.message });
    }
});

// Add a favorite (POST)
router.post('/', async (req, res) => {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
        return res.status(400).json({ message: 'User ID and Movie ID are required.' });
    }

    try {
        // Check if the movie is already favorited
        const existingFavorite = await FavoriteModel.findOne({ userId, movieId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Movie is already favorited.' });
        }

        const favorite = new FavoriteModel({ userId, movieId });
        const savedFavorite = await favorite.save();
        res.status(201).json(savedFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error: error.message });
    }
});

// Remove a favorite (DELETE)
router.delete('/:userId/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        const deletedFavorite = await FavoriteModel.findOneAndDelete({ userId, movieId });

        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorite not found.' });
        }

        res.status(200).json({ message: 'Favorite successfully removed.' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error: error.message });
    }
});

export default router;
