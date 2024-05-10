package com.backend.project.controller;

import com.backend.project.entity.SportsTable;
import com.backend.project.repository.SportsTableRepository;
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
@RequestMapping("/api/v1/sports")
public class SportsTableController {

    @Autowired
    private SportsTableRepository sportsRepository;

    @GetMapping
    public List<SportsTable> getAllSports() {
        return sportsRepository.getAllSports();
    }

    @PostMapping
    public ResponseEntity<SportsTable> addSports(@RequestBody SportsTable sports) {
        try {
            sportsRepository.save(sports);
            return new ResponseEntity<>(sports, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SportsTable> getSportsById(@PathVariable Integer id) {
        SportsTable sports = sportsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sports not found with id: " + id));
        return ResponseEntity.ok(sports);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSportsById(@PathVariable Integer id) {
        try {
            sportsRepository.deleteSportsById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Sports not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SportsTable> updateSports(@PathVariable Integer id, @RequestBody SportsTable sportsDetails) {
        SportsTable existingSports = sportsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sports not found with id: " + id));

        existingSports.setSportsName(sportsDetails.getSportsName());

        try {
            SportsTable updatedSports = sportsRepository.save(existingSports);
            return ResponseEntity.ok(updatedSports);
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
