import axios from 'axios';

const MOVIES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/movies';

class MoviesService {
  // Get all movies
  getAllMovies() {
    return axios.get(`${MOVIES_BASE_REST_API_URL}/g`);
  }

  // Create movie
  createMovie(movie) {
    return axios.post(MOVIES_BASE_REST_API_URL, movie);
  }

  // Get movie by ID
  getMovieById(id) {
    return axios.get(`${MOVIES_BASE_REST_API_URL}/${id}`);
  }

  // Update movie
  updateMovie(id, movie) {
    return axios.put(`${MOVIES_BASE_REST_API_URL}/${id}`, movie);
  }

  // Delete movie
  deleteMovie(id) {
    return axios.delete(`${MOVIES_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const moviesServiceInstance = new MoviesService();

// Export the instance as the default module
export default moviesServiceInstance;
