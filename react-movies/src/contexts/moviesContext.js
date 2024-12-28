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

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const userId = userName; // 确保 userName 是正确的用户标识
          const favoriteMovies = await getFavouriteMovies(userId);
          console.log("Fetched favorites from backend:", favoriteMovies);
          setFavorites(favoriteMovies.map((fav) => fav.movieId));
        } catch (error) {
          console.error("Failed to fetch favorite movies:", error);
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
    } catch (error) {
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
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
