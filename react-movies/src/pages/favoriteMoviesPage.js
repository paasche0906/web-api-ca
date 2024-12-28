import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
    const { favorites: movieIds } = useContext(MoviesContext);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await Promise.all(
                    movieIds.map((movieId) =>
                        getMovie({ queryKey: ["movie", { id: movieId }] })
                    )
                );
                setMovies(fetchedMovies);
            } catch (error) {
                console.error("Failed to load favorite movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieIds.length > 0) {
            fetchMovies();
        } else {
            setIsLoading(false);
        }
    }, [movieIds]);
    if (isLoading) {
        return <Spinner />;
    }

    console.log("Movies to display:", movies);

    return (
        <PageTemplate
            title="Favorite Movies"
            movies={movies}
            action={(movie) => (
                <>
                    <RemoveFromFavorites movie={movie} />
                    <WriteReview movie={movie} />
                </>
            )}
        />
    );
};

export default FavoriteMoviesPage;
