package com.backend.project.controller;

import com.backend.project.entity.AgeRestrictionTable;
import com.backend.project.repository.AgeRestrictionTableRepository;
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
@RequestMapping("/api/v1/age-restriction")
public class AgeRestrictionTableController {

    @Autowired
    private AgeRestrictionTableRepository ageRestrictionRepository;

    @GetMapping
    public List<AgeRestrictionTable> getAllAgeRestrictions() {
        return ageRestrictionRepository.getAllAgeRestrictions();
    }

    @PostMapping
    public ResponseEntity<AgeRestrictionTable> addAgeRestriction(@RequestBody AgeRestrictionTable ageRestriction) {
        try {
            ageRestrictionRepository.save(ageRestriction);
            return new ResponseEntity<>(ageRestriction, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgeRestrictionTable> getAgeRestrictionById(@PathVariable Integer id) {
        AgeRestrictionTable ageRestriction = ageRestrictionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Age restriction not found with id: " + id));
        return ResponseEntity.ok(ageRestriction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgeRestrictionById(@PathVariable Integer id) {
        try {
            ageRestrictionRepository.deleteAgeRestrictionById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Age restriction not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgeRestrictionTable> updateAgeRestriction(@PathVariable Integer id,
            @RequestBody AgeRestrictionTable ageRestrictionDetails) {
        AgeRestrictionTable existingAgeRestriction = ageRestrictionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Age restriction not found with id: " + id));

        existingAgeRestriction.setAgeRestrictionName(ageRestrictionDetails.getAgeRestrictionName());

        try {
            AgeRestrictionTable updatedAgeRestriction = ageRestrictionRepository.save(existingAgeRestriction);
            return ResponseEntity.ok(updatedAgeRestriction);
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
