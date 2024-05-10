import axios from 'axios';

const BOOKING_TYPE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/booking-type';

class BookingTypeService {
  getAllBookingTypes() {
    return axios.get(BOOKING_TYPE_BASE_REST_API_URL);
  }

  addBookingType(bookingType) {
    return axios.post(BOOKING_TYPE_BASE_REST_API_URL, bookingType);
  }

  getBookingTypeById(id) {
    return axios.get(`${BOOKING_TYPE_BASE_REST_API_URL}/${id}`);
  }

  deleteBookingTypeById(id) {
    return axios.delete(`${BOOKING_TYPE_BASE_REST_API_URL}/${id}`);
  }

  updateBookingType(id, bookingTypeDetails) {
    return axios.put(`${BOOKING_TYPE_BASE_REST_API_URL}/${id}`, bookingTypeDetails);
  }
}

// Create an instance of the class
const bookingTypeServiceInstance = new BookingTypeService();

// Export the instance as the default module
export default bookingTypeServiceInstance;