import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveFromFavorites = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await context.removeFromFavorites(movie);
            alert(`"${movie.title}" has been removed from your favorites.`);
        } catch (error) {
            alert(`Failed to remove "${movie.title}" from favorites: ${error.message}`);
            console.error("Failed to remove from favorites:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavorites}
            disabled={isLoading}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavoritesIcon;
