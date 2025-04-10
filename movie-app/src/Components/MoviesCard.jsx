import { Link } from "react-router-dom";
import { Star, Calendar } from "lucide-react";

const MoviesCard = ({ movie }) => {
  if (!movie) return null;

  const { 
    imdbID: id,
    Title: title = "Titre inconnu",
    Poster: poster,
    imdbRating: rating = 0,
    Released: release_date,
    Plot: overview = "Pas de description disponible."
  } = movie;

  const formattedDate = release_date && release_date !== "N/A"
    ? new Date(release_date).toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Date inconnue';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 h-full flex flex-col">
      <Link to={`/movie/${id}`} className="block flex-shrink-0">
        {poster && poster !== "N/A" ? (
          <img
            src={poster}
            alt={`Affiche du film ${title}`}
            className="w-full h-72 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-72 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Image non disponible</span>
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/movie/${id}`} className="block">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white hover:text-red-800 dark:hover:text-red-500 transition-colors">
            {title}
          </h2>
        </Link>
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-blue-500 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <p className="mt-3 text-gray-700 dark:text-gray-400 text-sm line-clamp-3 flex-grow">
          {overview}
        </p>
        <Link 
          to={`/movie/${id}`}
          className="mt-4 text-center bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors inline-block"
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default MoviesCard;