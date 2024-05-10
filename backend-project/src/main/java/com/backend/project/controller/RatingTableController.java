package com.backend.project.controller;

import com.backend.project.entity.RatingTable;
import com.backend.project.repository.RatingTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/ratings")
public class RatingTableController {
    @Autowired
    private RatingTableRepository ratingRepository;

    // Get all ratings REST API
    @GetMapping
    public List<RatingTable> getAllRatings() {
        return ratingRepository.getAllRating();
    }

    // Add rating REST API
    @PostMapping
    public ResponseEntity<Void> addRating(@RequestBody RatingTable rating) {
        try {
            ratingRepository.addRating(rating.getUserId(), rating.getArtistId(), rating.getMovieId(),
                    rating.getGameId(), rating.getRating());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    // Update rating REST API
    @PutMapping("/{userId}/{artistId}/{movieId}/{gameId}")
    public ResponseEntity<Void> updateRating(@PathVariable int userId, @PathVariable int artistId,
            @PathVariable int movieId, @PathVariable int gameId, @RequestBody RatingTable rating) {
        ratingRepository.updateRating(userId, artistId, movieId, gameId, rating.getRating());
        return ResponseEntity.ok().build();
    }

    // Delete rating REST API
    @DeleteMapping("/{userId}/{artistId}/{movieId}/{gameId}")
    public ResponseEntity<Void> deleteRating(@PathVariable int userId, @PathVariable int artistId,
            @PathVariable int movieId, @PathVariable int gameId) {
        ratingRepository.deleteRating(userId, artistId, movieId, gameId);
        return ResponseEntity.noContent().build();
    }

    // Get ratings by user id REST API
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RatingTable>> getRatingsByUserId(@PathVariable int userId) {
        List<RatingTable> ratings = ratingRepository.findByUserId(userId);
        return ResponseEntity.ok(ratings);
    }

    // Exception handler for ResourceNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }
}
