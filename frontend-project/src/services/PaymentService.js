import axios from 'axios';

const PAYMENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/payments';

class PaymentService {
  // Get all payments
  getAllPayments() {
    return axios.get(PAYMENT_BASE_REST_API_URL);
  }

  // Create payment
  createPayment(payment) {
    return axios.post(PAYMENT_BASE_REST_API_URL, payment);
  }

  // Get payment by ID
  getPaymentById(id) {
    return axios.get(`${PAYMENT_BASE_REST_API_URL}/${id}`);
  }

  // Update payment
  updatePayment(id, payment) {
    return axios.put(`${PAYMENT_BASE_REST_API_URL}/${id}`, payment);
  }

  // Delete payment
  deletePayment(id) {
    return axios.delete(`${PAYMENT_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const paymentServiceInstance = new PaymentService();

// Export the instance as the default module
export default paymentServiceInstance;
