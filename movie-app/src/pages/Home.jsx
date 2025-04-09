import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "Api";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "fr-FR",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Erreur lors du chargement des films :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
          language: "fr-FR",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        🎬 Films Populaires
      </h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un film..."
          className="px-4 py-2 w-64 rounded-l-full border dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-red-800 text-white px-4 py-2 rounded-r-full hover:bg-red-700"
        >
          Rechercher
        </button>
      </form>

      {loading ? (
        <div className="text-center text-white animate-pulse">Chargement...</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{movie.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ⭐ {movie.vote_average} | 🗓️ {movie.release_date}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
                  {movie.overview || "Pas de description disponible."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
