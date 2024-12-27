import React, { useState, useContext} from "react";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { isAuthenticated } = useContext(AuthContext); // Check user login status
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatchList, setMustWatchList] = useState([]);

  // Add to favourites
  const addToFavorites = (movie) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    if (!favorites.includes(movie.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie.id]);
    }
  };

  // Remove from favourites
  const removeFromFavorites = (movie) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to perform this action.");
      return;
    }

    setFavorites((prevFavorites) => prevFavorites.filter((mId) => mId !== movie.id));
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
