import axios from "axios";

const omdbAPI = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: {
    apikey: "57e8e1ca"
  }
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await omdbAPI.get("/", {
      params: {
        s: query.trim() || "movie",  
        page,
        type: "movie"
      },
    });
    
    if (response.data.Response === "False") {
      return {
        results: [],
        totalResults: 0,
        totalPages: 0
      };
    }

    return {
      results: response.data.Search || [],
      totalResults: parseInt(response.data.totalResults) || 0,
      totalPages: Math.ceil(parseInt(response.data.totalResults) / 10) 
    };
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await omdbAPI.get("/", {
      params: {
        i: id, 
        plot: "full"  
      }
    });
    
    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Movie not found");
    }
    
    return response.data;
  } catch (error) {
    console.error("Details error:", error);
    throw error;
  }
};