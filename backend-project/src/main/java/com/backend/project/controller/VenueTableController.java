package com.backend.project.controller;

import com.backend.project.entity.VenueTable;
import com.backend.project.repository.VenueTableRepository;
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
@RequestMapping("/api/v1/venue")
public class VenueTableController {

    @Autowired
    private VenueTableRepository venueRepository;

    @GetMapping
    public List<VenueTable> getAllVenues() {
        return venueRepository.getAllVenues();
    }

    @PostMapping
    public ResponseEntity<VenueTable> createVenue(@RequestBody VenueTable venue) {
        try {
            venueRepository.save(venue);
            return new ResponseEntity<>(venue, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<VenueTable> getVenueById(@PathVariable Integer id) {
        VenueTable venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
        return ResponseEntity.ok(venue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenueById(@PathVariable Integer id) {
        try {
            venueRepository.deleteVenueById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Venue not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<VenueTable> updateVenue(@PathVariable Integer id, @RequestBody VenueTable venueDetails) {
        VenueTable existingVenue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));

        existingVenue.setVenueName(venueDetails.getVenueName());
        existingVenue.setLocation(venueDetails.getLocation());
        existingVenue.setCapacity(venueDetails.getCapacity());
        existingVenue.setContactInfo(venueDetails.getContactInfo());

        try {
            VenueTable updatedVenue = venueRepository.save(existingVenue);
            return ResponseEntity.ok(updatedVenue);
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
