const BASE_URL = 'http://localhost:8080/api';

export const getMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/all?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch movies from backend');
    return response.json();
};

export const getMovie = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;

    return fetch(`${BASE_URL}/movies/${id}`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/tmdb/genres`);
    if (!response.ok) {
        throw new Error('Failed to fetch genres');
    }
    return await response.json();
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;

    return fetch(`${BASE_URL}/movies/${id}/images`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getUpcomingMovies = async (page = 1) => {
    return fetch(`${BASE_URL}/movies/tmdb/upcoming?page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch upcoming movies');
            }
            return res.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getTrendingMoviesToday = async (page = 1) => {
    return fetch(`${BASE_URL}/movies/tmdb/trending/today?page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch trending movies');
            }
            return res.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getPopularMovies = async (page = 1) => {
    return fetch(`${BASE_URL}/movies/tmdb/popular?page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            return res.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getTopRatedMovies = async (page = 1) => {
    return fetch(`${BASE_URL}/movies/tmdb/top_rated?page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch top-rated movies');
            }
            return res.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getCredits = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}/credits`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieRecommendations = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}/recommendations`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getSimilarMovies = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}/similar`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getVideos = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getPeopleDetails = (personId) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieCredits = (personId) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getExternalId = (personId) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${personId}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

// Get a user's favourite movies
export const getFavouriteMovies = async (userId) => {
    const response = await fetch(`${BASE_URL}/favorites/user/${userId}`, {
        headers: {
            Authorization: window.localStorage.getItem('token'),
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch favorites');
    }
    return response.json();
};


// Add a favourite to a user
export const addFavouriteMovie = async (userId, movieId) => {
    const response = await fetch(`${BASE_URL}/favorites/`, {
        method: "POST",
        headers: {
            Authorization: window.localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, movieId }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add to favorites");
    }
    return response.json();
};

// Delete a user's favourites for a particular movie
export const deleteFavouriteMovie = async (userId, movieId) => {
    const response = await fetch(`${BASE_URL}/favorites/${userId}/${movieId}`, {
        method: "DELETE",
        headers: {
            Authorization: window.localStorage.getItem("token"),
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove from favorites");
    }
    return response.json();
};