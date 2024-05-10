package com.backend.project.controller;

import com.backend.project.entity.ConcertTable;
import com.backend.project.repository.ConcertTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/concerts")
public class ConcertTableController {
    @Autowired
    private ConcertTableRepository concertRepository;

    // Get all concerts REST API
    @GetMapping
    public List<ConcertTable> getAllConcerts() {
        return concertRepository.getAllConcerts();
    }

    // Create concert REST API
    @PostMapping
    public ResponseEntity<ConcertTable> addConcert(@RequestBody ConcertTable concert) {
        try {
            ConcertTable newConcert = concertRepository.save(concert);
            return new ResponseEntity<>(newConcert, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get concert by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<ConcertTable> getConcertById(@PathVariable Integer id) {
        ConcertTable concert = concertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Concert not found with id: " + id));
        return ResponseEntity.ok(concert);
    }

    // Update concert REST API
    @PutMapping("/{id}")
    public ResponseEntity<ConcertTable> updateConcert(@PathVariable Integer id,
            @RequestBody ConcertTable concertDetails) {
        ConcertTable concert = concertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Concert not found with id: " + id));

        concert.setConcertName(concertDetails.getConcertName());
        concert.setArtistId(concertDetails.getArtistId());
        concert.setVenueId(concertDetails.getVenueId());
        concert.setConcertDate(concertDetails.getConcertDate());
        concert.setConcertTime(concertDetails.getConcertTime());

        try {
            ConcertTable updatedConcert = concertRepository.save(concert);
            return ResponseEntity.ok(updatedConcert);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete concert REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConcertById(@PathVariable Integer id) {
        try {
            concertRepository.deleteById(id);
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
