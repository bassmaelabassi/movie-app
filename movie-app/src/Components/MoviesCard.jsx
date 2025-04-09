import { Link } from "react-router-dom";

const MoviesCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date, overview } = movie;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-72 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          ⭐ {vote_average} |  {release_date}
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
          {overview || "Pas de description disponible."}
        </p>
      </div>
    </div>
  );
};

export default MoviesCard;
