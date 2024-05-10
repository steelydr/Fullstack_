package com.backend.project.controller;

import com.backend.project.entity.BookingTypeTable;
import com.backend.project.repository.BookingTypeTableRepository;
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
@RequestMapping("/api/v1/booking-type")
public class BookingTypeTableController {

    @Autowired
    private BookingTypeTableRepository bookingTypeRepository;

    @GetMapping
    public List<BookingTypeTable> getAllBookingTypes() {
        return bookingTypeRepository.getAllBookingTypes();
    }

    @PostMapping
    public ResponseEntity<BookingTypeTable> addBookingType(@RequestBody BookingTypeTable bookingType) {
        try {
            bookingTypeRepository.save(bookingType);
            return new ResponseEntity<>(bookingType, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingTypeTable> getBookingTypeById(@PathVariable Integer id) {
        BookingTypeTable bookingType = bookingTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking type not found with id: " + id));
        return ResponseEntity.ok(bookingType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookingTypeById(@PathVariable Integer id) {
        try {
            bookingTypeRepository.deleteBookingTypeById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Booking type not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingTypeTable> updateBookingType(@PathVariable Integer id,
            @RequestBody BookingTypeTable bookingTypeDetails) {
        BookingTypeTable existingBookingType = bookingTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking type not found with id: " + id));

        existingBookingType.setBookingName(bookingTypeDetails.getBookingName());

        try {
            BookingTypeTable updatedBookingType = bookingTypeRepository.save(existingBookingType);
            return ResponseEntity.ok(updatedBookingType);
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
