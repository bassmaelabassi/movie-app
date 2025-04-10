import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import { ArrowLeft } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        
        if (data.Response === "False") {
          throw new Error(data.Error || "Film non trouvé");
        }
        
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <p className="text-xl mb-4">{error}</p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={20} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  const {
    Title: title,
    Poster: poster,
    Released: released,
    imdbRating,
    Plot: overview,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Writer: writer,
    Actors: actors,
    Language: language,
    Country: country,
    Awards: awards,
    Production: production
  } = movie;

  const formattedDate = released 
    ? new Date(released).toLocaleDateString('fr-FR') 
    : 'Date inconnue';

  const genres = genre ? genre.split(", ") : [];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <div className="max-w-screen-xl mx-auto p-6 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 mb-6"
        >
          <ArrowLeft size={20} /> Retour
        </Link>

        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {poster && poster !== "N/A" ? (
            <img
              src={poster}
              alt={title}
              className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0 object-cover"
            />
          ) : (
            <div className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Image non disponible</span>
            </div>
          )}
          
          <div className="p-6 md:p-8 md:w-2/3">
            <h1 className="text-3xl font-bold">{title}</h1>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-3 rounded-full">
                ⭐ {imdbRating || 'N/A'} / 10
              </span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-3 rounded-full">
                🗓️ {formattedDate}
              </span>
              {runtime && runtime !== "N/A" && (
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-3 rounded-full">
                  ⏳ {runtime}
                </span>
              )}
            </div>
            
            {genres.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-xl mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-3 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {overview && overview !== "N/A" && (
              <div className="mt-6">
                <h3 className="font-semibold text-xl mb-2">Synopsis</h3>
                <p className="text-gray-700 dark:text-gray-300">{overview}</p>
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {director && director !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Réalisateur</h3>
                  <p className="text-gray-700 dark:text-gray-300">{director}</p>
                </div>
              )}
              
              {writer && writer !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Scénariste</h3>
                  <p className="text-gray-700 dark:text-gray-300">{writer}</p>
                </div>
              )}

              {actors && actors !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Acteurs</h3>
                  <p className="text-gray-700 dark:text-gray-300">{actors}</p>
                </div>
              )}

              {language && language !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Langue</h3>
                  <p className="text-gray-700 dark:text-gray-300">{language}</p>
                </div>
              )}

              {country && country !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Pays</h3>
                  <p className="text-gray-700 dark:text-gray-300">{country}</p>
                </div>
              )}

              {awards && awards !== "N/A" && (
                <div>
                  <h3 className="font-semibold">Récompenses</h3>
                  <p className="text-gray-700 dark:text-gray-300">{awards}</p>
                </div>
              )}
            </div>
            
            {production && production !== "N/A" && (
              <div className="mt-6">
                <h3 className="font-semibold text-xl mb-2">Production</h3>
                <p className="text-gray-700 dark:text-gray-300">{production}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;