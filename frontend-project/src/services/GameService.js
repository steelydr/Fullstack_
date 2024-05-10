import axios from 'axios';

const GAME_BASE_REST_API_URL = 'http://localhost:8080/api/v1/game';

class GameService {
  // Get all games
  getAllGames() {
    return axios.get(GAME_BASE_REST_API_URL);
  }

  // Create game
  createGame(game) {
    return axios.post(GAME_BASE_REST_API_URL, game);
  }

  // Get game by ID
  getGameById(id) {
    return axios.get(`${GAME_BASE_REST_API_URL}/${id}`);
  }

  // Update game
  updateGame(id, game) {
    return axios.put(`${GAME_BASE_REST_API_URL}/${id}`, game);
  }

  // Delete game
  deleteGame(id) {
    return axios.delete(`${GAME_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const gameServiceInstance = new GameService();

// Export the instance as the default module
export default gameServiceInstance;
