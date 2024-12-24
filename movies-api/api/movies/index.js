import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres, getTopRatedMovies, getPopularMovies, getTrendingMovies } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Fetch Movies by Genre
router.get('/mongo/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params;

    try {
        const movies = await movieModel.find({ genre_ids: genreId }); // Search for movies matching genreId
        if (movies.length > 0) {
            res.status(200).json(movies);
        } else {
            res.status(404).json({ message: 'No movies found for the specified genre.', status_code: 404 });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by genre', error: error.message });
    }
}));

// Get movies with ratings higher than a specified value
router.get('/mongo/rating', asyncHandler(async (req, res) => {
    const { minRating = 7 } = req.query;

    try {
        const movies = await movieModel.find({ vote_average: { $gte: +minRating } });
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found with the given rating.', status_code: 404 });
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by rating', error: error.message });
    }
}));

// Get movies based on the year provided
router.get('/mongo/year/:year', asyncHandler(async (req, res) => {
    const { year } = req.params;

    try {
        const movies = await movieModel.find({ release_date: { $regex: `^${year}` } });
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for the given year.', status_code: 404 });
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by year', error: error.message });
    }
}));

// Gets movies whose original language is the specified value:
router.get('/mongo/language', asyncHandler(async (req, res) => {
    const { lang } = req.query;

    try {
        const movies = await movieModel.find({ original_language: lang });
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for the specified language.', status_code: 404 });
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by language', error: error.message });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get popular movies from TMDB
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

// Get trending movies from TMDB
router.get('/tmdb/trending/today', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

// Get Top-rated movies from TMDB
router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const top_ratedMovies = await getTopRatedMovies();
    res.status(200).json(top_ratedMovies);
}));

// Get genres from TMDB
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

export default router;