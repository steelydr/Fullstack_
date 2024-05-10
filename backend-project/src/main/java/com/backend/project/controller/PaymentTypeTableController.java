package com.backend.project.controller;

import com.backend.project.entity.PaymentTypeTable;
import com.backend.project.repository.PaymentTypeTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/payment-type")
public class PaymentTypeTableController {

    @Autowired
    private PaymentTypeTableRepository paymentTypeRepository;

    @GetMapping
    public List<PaymentTypeTable> getAllPaymentTypes() {
        return paymentTypeRepository.getAllPaymentTypes();
    }

    @PostMapping
    public ResponseEntity<PaymentTypeTable> addPaymentType(@RequestBody PaymentTypeTable paymentType) {
        try {
            paymentTypeRepository.save(paymentType);
            return new ResponseEntity<>(paymentType, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentTypeTable> getPaymentTypeById(@PathVariable Integer id) {
        PaymentTypeTable paymentType = paymentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment type not found with id: " + id));
        return ResponseEntity.ok(paymentType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentTypeById(@PathVariable Integer id) {
        try {
            paymentTypeRepository.deletePaymentTypeById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Payment type not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentTypeTable> updatePaymentType(@PathVariable Integer id,
            @RequestBody PaymentTypeTable paymentTypeDetails) {
        PaymentTypeTable existingPaymentType = paymentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment type not found with id: " + id));

        existingPaymentType.setTypeName(paymentTypeDetails.getTypeName());

        try {
            PaymentTypeTable updatedPaymentType = paymentTypeRepository.save(existingPaymentType);
            return ResponseEntity.ok(updatedPaymentType);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Exception handler for ResourceNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }
}
