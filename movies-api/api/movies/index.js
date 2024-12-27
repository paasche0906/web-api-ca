import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getTopRatedMovies,
    getPopularMovies,
    getTrendingMovies,
    getAllMovies,
    getMovieDetails,
    getMovieImages,
    getCredits,
    getMovieRecommendations,
    getSimilarMovies,
} from '../tmdb-api';

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

    try {
        const movie = await movieModel.findByMovieDBId(id);
        if (movie) {
            return res.status(200).json(movie);
        }

        const movieDetails = await getMovieDetails(id);
        if (movieDetails) {
            return res.status(200).json(movieDetails);
        }

        return res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        return res.status(500).json({ message: 'Error fetching movie details', error: error.message });
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

// Get all movies from TMDB
router.get('/tmdb/all', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query; // Optional pagination
    try {
        const allMovies = await getAllMovies(page);
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies from TMDB', error: error.message });
    }
}));

// Get Images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const images = await getMovieImages(id);
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching movie images:', error.message);
        res.status(500).json({ message: 'Failed to fetch movie images', error: error.message });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query; // 获取分页参数
    try {
        const upcomingMovies = await getUpcomingMovies(page); // 调用 TMDB API
        res.status(200).json(upcomingMovies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch upcoming movies', error: error.message });
    }
}));

// Get popular movies from TMDB
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
        const popularMovies = await getPopularMovies(page);
        res.status(200).json(popularMovies);
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch popular movies', error: error.message });
    }
}));

// Get trending movies from TMDB
router.get('/tmdb/trending/today', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
        const trendingMovies = await getTrendingMovies(page);
        res.status(200).json(trendingMovies);
    } catch (error) {
        console.error('Error fetching trending movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch trending movies', error: error.message });
    }
}));
// Get Top-rated movies from TMDB
router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
        const topRatedMovies = await getTopRatedMovies(page);
        res.status(200).json(topRatedMovies);
    } catch (error) {
        console.error('Error fetching top-rated movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch top-rated movies', error: error.message });
    }
}));

// Get genres from TMDB
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Get credits from TMDB
router.get('/:movieId/credits', asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    try {
        const credits = await getCredits(movieId);
        res.status(200).json(credits);
    } catch (error) {
        console.error('Error fetching movie credits:', error.message);
        res.status(500).json({ message: 'Failed to fetch movie credits', error: error.message });
    }
}));

// Get movie recommendations from TMDB
router.get('/:movieId/recommendations', asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    try {
        const recommendations = await getMovieRecommendations(movieId);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching movie recommendations:', error.message);
        res.status(500).json({ message: 'Failed to fetch movie recommendations', error: error.message });
    }
}));

// Get similar movies from TMDB
router.get('/:movieId/similar', asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    try {
        const similarMovies = await getSimilarMovies(movieId);
        res.status(200).json(similarMovies);
    } catch (error) {
        console.error('Error fetching similar movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch similar movies', error: error.message });
    }
}));



export default router;