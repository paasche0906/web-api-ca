import express from 'express';
import ReviewModel from './reviewModel';

const router = express.Router();

// Add a review (POST)
router.post('/', async (req, res) => {
    const { movieId, author, content, rating } = req.body;
    if (!movieId || !author || !content || !rating) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const review = new ReviewModel({ movieId, author, content, rating });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error saving review', error: error.message });
    }
});

// Get reviews for a given film
router.get('/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try {
        const reviews = await ReviewModel.find({ movieId });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for the specified movie.' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

export default router;
