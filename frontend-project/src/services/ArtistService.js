import axios from 'axios';

const ARTIST_BASE_REST_API_URL = 'http://localhost:8080/api/v1/artist';

class ArtistService {
  getAllArtists() {
    return axios.get(ARTIST_BASE_REST_API_URL);
  }

  addArtist(artist) {
    return axios.post(ARTIST_BASE_REST_API_URL, artist);
  }

  getArtistById(id) {
    return axios.get(`${ARTIST_BASE_REST_API_URL}/${id}`);
  }

  deleteArtistById(id) {
    return axios.delete(`${ARTIST_BASE_REST_API_URL}/${id}`);
  }

  updateArtist(id, artistDetails) {
    return axios.put(`${ARTIST_BASE_REST_API_URL}/${id}`, artistDetails);
  }
}

// Create an instance of the class
const artistServiceInstance = new ArtistService();

// Export the instance as the default module
export default artistServiceInstance;
