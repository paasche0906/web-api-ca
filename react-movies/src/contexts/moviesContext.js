import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import {
  getFavouriteMovies,
  addFavouriteMovie,
  deleteFavouriteMovie,
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { isAuthenticated, userName } = useContext(AuthContext); // Check user login status
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatchList, setMustWatchList] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        setIsLoadingFavorites(true);
        try {
          const userId = userName;
          const favoriteMovies = await getFavouriteMovies(userId);
          console.log("Fetched favorites from backend:", favoriteMovies);
          setFavorites(favoriteMovies.map((fav) => fav.movieId));
        } catch (error) {
          console.error("Failed to fetch favorite movies:", error);
        } finally {
          setIsLoadingFavorites(false);
        }
      };
      fetchFavorites();
    }
  }, [isAuthenticated, userName]);

  // Add to favourites
  const addToFavorites = async (movie) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    try {
      const userId = userName;
      await addFavouriteMovie(userId, movie.id);
      setFavorites((prevFavorites) => [...prevFavorites, movie.id]);
      alert(`"${movie.title}" has been added to your favorites.`);
    } catch (error) {
      alert(`Failed to add "${movie.title}" to favorites: ${error.message}`);
      console.error("Failed to add to favorites:", error);
    }
  };

  // Remove from favourites
  const removeFromFavorites = async (movie) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    try {
      const userId = userName;
      await deleteFavouriteMovie(userId, movie.id);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((mId) => mId !== movie.id)
      );
      alert(`"${movie.title}" has been removed from your favorites.`);
    } catch (error) {
      alert(`Failed to remove "${movie.title}" from favorites: ${error.message}`);
      console.error("Failed to remove from favorites:", error);
    }
  };

  // Add to Watchlist
  const addToMustWatchList = (movieId) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    if (!mustWatchList.includes(movieId)) {
      setMustWatchList((prevList) => [...prevList, movieId]);
    }
  };

  // Remove from Watchlist
  const removeFromMustWatchList = (movieId) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    setMustWatchList((prevList) => prevList.filter((id) => id !== movieId));
  };

  // Add a movie review
  const addReview = (movie, review) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    setMyReviews((prevReviews) => ({ ...prevReviews, [movie.id]: review }));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isLoadingFavorites, // Add this to pass loading state to components
        myReviews,
        addReview,
        mustWatchList,
        addToMustWatchList,
        removeFromMustWatchList,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
