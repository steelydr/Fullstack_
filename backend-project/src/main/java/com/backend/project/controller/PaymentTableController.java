package com.backend.project.controller;

import com.backend.project.entity.PaymentTable;
import com.backend.project.repository.PaymentTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentTableController {
    @Autowired
    private PaymentTableRepository paymentRepository;

    // Get all payments REST API
    @GetMapping
    public List<PaymentTable> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Create payment REST API
    @PostMapping
    public ResponseEntity<PaymentTable> createPayment(@RequestBody PaymentTable payment) {
        try {
            PaymentTable newPayment = paymentRepository.save(payment);
            return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get payment by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<PaymentTable> getPaymentById(@PathVariable Long id) {
        PaymentTable payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
        return ResponseEntity.ok(payment);
    }

    // Update payment REST API
    @PutMapping("/{id}")
    public ResponseEntity<PaymentTable> updatePayment(@PathVariable Long id, @RequestBody PaymentTable paymentDetails) {
        PaymentTable payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

        payment.setBookingId(paymentDetails.getBookingId());
        payment.setUserId(paymentDetails.getUserId());
        payment.setPaymentDate(paymentDetails.getPaymentDate());
        payment.setPaymentTime(paymentDetails.getPaymentTime());
        payment.setPaymentType(paymentDetails.getPaymentType());
        payment.setAmount(paymentDetails.getAmount());
        payment.setPaymentStatus(paymentDetails.getPaymentStatus());

        try {
            PaymentTable updatedPayment = paymentRepository.save(payment);
            return ResponseEntity.ok(updatedPayment);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete payment REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentById(@PathVariable Long id) {
        try {
            paymentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Exception handler for ResourceNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }
}
