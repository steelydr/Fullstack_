import axios from 'axios';

const BOOKING_BASE_REST_API_URL = 'http://localhost:8080/api/v1/bookings';

class BookingServices {
  // Get all bookings
  getAllBookings() {
    return axios.get(BOOKING_BASE_REST_API_URL);
  }

  // Create booking
  createBooking(booking) {
    return axios.post(BOOKING_BASE_REST_API_URL, booking);
  }

  // Get booking by ID
  getBookingById(id) {
    return axios.get(`${BOOKING_BASE_REST_API_URL}/${id}`);
  }

  // Update booking
  updateBooking(id, booking) {
    return axios.put(`${BOOKING_BASE_REST_API_URL}/${id}`, booking);
  }

  // Delete booking
  deleteBookingById(id) {
    return axios.delete(`${BOOKING_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const bookingServicesInstance = new BookingServices();

// Export the instance as the default module
export default bookingServicesInstance;
