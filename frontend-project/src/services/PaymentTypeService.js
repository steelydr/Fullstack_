import axios from 'axios';

const PAYMENT_TYPE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/payment-type';

class PaymentTypeService {
  getAllPaymentTypes() {
    return axios.get(PAYMENT_TYPE_BASE_REST_API_URL);
  }

  addPaymentType(paymentType) {
    return axios.post(PAYMENT_TYPE_BASE_REST_API_URL, paymentType);
  }

  getPaymentTypeById(id) {
    return axios.get(`${PAYMENT_TYPE_BASE_REST_API_URL}/${id}`);
  }

  deletePaymentTypeById(id) {
    return axios.delete(`${PAYMENT_TYPE_BASE_REST_API_URL}/${id}`);
  }

  updatePaymentType(id, paymentTypeDetails) {
    return axios.put(`${PAYMENT_TYPE_BASE_REST_API_URL}/${id}`, paymentTypeDetails);
  }
}

// Create an instance of the class
const paymentTypeServiceInstance = new PaymentTypeService();

// Export the instance as the default module
export default paymentTypeServiceInstance;
