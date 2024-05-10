package com.backend.project.controller;

import com.backend.project.entity.BookingTable;
import com.backend.project.repository.BookingTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingTableController {
    @Autowired
    private BookingTableRepository bookingRepository;

    // Get all bookings REST API
    @GetMapping
    public List<BookingTable> getAllBookings() {
        return bookingRepository.getAllBookings();
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingTable booking) {
        try {
            BookingTable newBooking = bookingRepository.save(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBooking);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Booking already exists");
        }
    }

    // Get booking by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<BookingTable> getBookingById(@PathVariable Long id) {
        BookingTable booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return ResponseEntity.ok(booking);
    }

    // Update booking REST API
    @PutMapping("/{id}")
    public ResponseEntity<BookingTable> updateBooking(@PathVariable Long id, @RequestBody BookingTable bookingDetails) {
        BookingTable booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        booking.setUserId(bookingDetails.getUserId());
        booking.setBookingType(bookingDetails.getBookingType());
        booking.setVenueId(bookingDetails.getVenueId());
        booking.setDateb(bookingDetails.getDateb());
        booking.setTimeb(bookingDetails.getTimeb());
        booking.setSeatNo(bookingDetails.getSeatNo());
        booking.setBookingStatus(bookingDetails.getBookingStatus());
        booking.setAmount(bookingDetails.getAmount());

        try {
            BookingTable updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete booking REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookingById(@PathVariable Long id) {
        try {
            bookingRepository.deleteBookingById(id);
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
