import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await context.addToFavorites(movie);
      alert(`"${movie.title}" has been added to your favorites.`);
    } catch (error) {
      alert(`Failed to add "${movie.title}" to favorites: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IconButton
      aria-label="add to favorites"
      onClick={handleAddToFavorites}
      disabled={isLoading}
    >
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
