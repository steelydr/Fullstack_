package com.backend.project.controller;

import com.backend.project.entity.ArtistTable;
import com.backend.project.repository.ArtistTableRepository;
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
@RequestMapping("/api/v1/artist")
public class ArtistTableController {

    @Autowired
    private ArtistTableRepository artistRepository;

    @GetMapping
    public List<ArtistTable> getAllArtists() {
        return artistRepository.getAllArtists();
    }

    @PostMapping
    public ResponseEntity<ArtistTable> addArtist(@RequestBody ArtistTable artist) {
        try {
            artistRepository.save(artist);
            return new ResponseEntity<>(artist, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtistTable> getArtistById(@PathVariable Integer id) {
        ArtistTable artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found with id: " + id));
        return ResponseEntity.ok(artist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtistById(@PathVariable Integer id) {
        try {
            artistRepository.deleteArtistById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Artist not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtistTable> updateArtist(@PathVariable Integer id, @RequestBody ArtistTable artistDetails) {
        ArtistTable existingArtist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found with id: " + id));

        existingArtist.setArtistName(artistDetails.getArtistName());
        existingArtist.setRating(artistDetails.getRating());

        try {
            ArtistTable updatedArtist = artistRepository.save(existingArtist);
            return ResponseEntity.ok(updatedArtist);
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
