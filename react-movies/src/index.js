import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import TrendingTodayPage from "./pages/TrendingTodayPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import TopRatedMovies from "./pages/TopRatedMovies";
import SimilarMoviesPage from "./pages/SimilarMoviesPage";
import MovieVideoPage from "./pages/MovieVideoPage";
import MovieCreditsPage from "./pages/MovieCreditsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import WatchlistMoviesPage from "./pages/watchlistMoviesPage";
import AuthContextProvider from "./contexts/authContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/watchlists" element={<WatchlistMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/trending/today" element={<TrendingTodayPage />} />
              <Route path="/movie/:id/recommendations" element={<RecommendationsPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/top_rated" element={<TopRatedMovies />} />
              <Route path="/movie/:id/similar" element={< SimilarMoviesPage />} />
              <Route path="/movie/:id/videos" element={< MovieVideoPage />} />
              <Route path="/movie/:id/credits" element={< MovieCreditsPage />} />
              <Route path="/person/:personId" element={<PersonDetailsPage />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);