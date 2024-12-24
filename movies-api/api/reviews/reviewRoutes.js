import express from 'express';
import ReviewModel from './reviewModel';

const router = express.Router();

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

// Get all reviews for a given user
router.get('/user/:author', async (req, res) => {
    const { author } = req.params;

    try {
        const reviews = await ReviewModel.find({ author });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for the specified user.' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error: error.message });
    }
});

// Get all reviews (with paging support)
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const reviews = await ReviewModel.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await ReviewModel.countDocuments();

        res.status(200).json({
            total: count,
            page: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            reviews
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Get Highly Rated Reviews
router.get('/high-rating/:minRating', async (req, res) => {
    const { minRating } = req.params;

    try {
        const reviews = await ReviewModel.find({ rating: { $gte: +minRating } });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found with the given rating.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching high-rating reviews', error: error.message });
    }
});

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


// Update reviews (PUT)
router.put('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const { content, rating } = req.body;

    if (!content && !rating) {
        return res.status(400).json({ message: 'Content or rating must be provided for update.' });
    }

    try {
        const updatedReview = await ReviewModel.findByIdAndUpdate(
            reviewId,
            { content, rating },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
});

// Delete review
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json({ message: 'Review successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});



export default router;
