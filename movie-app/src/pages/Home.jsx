import { useEffect, useState, useCallback } from "react";
import { searchMovies } from "../services/api";
import MoviesCard from "../Components/MoviesCard";
import { debounce } from "lodash";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchMovies(searchTerm, page);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setSearchTerm(searchValue);
      setPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        🎬 Recherche de Films
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Rechercher un film..."
          className="px-4 py-2 w-64 rounded-full border dark:bg-gray-800 dark:text-white"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-10 text-gray-800 dark:text-white">
          Aucun film trouvé
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MoviesCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="px-4 py-2 text-gray-800 dark:text-white">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;