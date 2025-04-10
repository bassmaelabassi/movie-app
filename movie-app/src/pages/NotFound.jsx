import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">Page non trouvée</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;