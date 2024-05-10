package com.backend.project.controller;

import com.backend.project.entity.MoviesTable;
import com.backend.project.repository.MoviesTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies")
public class MoviesTableController {
    @Autowired
    private MoviesTableRepository moviesRepository;

    // Get all movies REST API
    @GetMapping("/g")
    public List<MoviesTable> getAllMovies() {
        return moviesRepository.getAllMovies();
    }

    // Create movie REST API
    @PostMapping
    public ResponseEntity<MoviesTable> createMovie(@RequestBody MoviesTable movie) {
        try {
            MoviesTable newMovie = moviesRepository.save(movie);
            return new ResponseEntity<>(newMovie, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get movie by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<MoviesTable> getMovieById(@PathVariable Integer id) {
        MoviesTable movie = moviesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
        return ResponseEntity.ok(movie);
    }

    // Update movie REST API
    @PutMapping("/{id}")
    public ResponseEntity<MoviesTable> updateMovie(@PathVariable Integer id, @RequestBody MoviesTable movieDetails) {
        MoviesTable movie = moviesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

        movie.setMovieName(movieDetails.getMovieName());
        movie.setReleaseDate(movieDetails.getReleaseDate());
        movie.setAgeRestrictionId(movieDetails.getAgeRestrictionId());
        movie.setVenueId(movieDetails.getVenueId());
        movie.setGenre(movieDetails.getGenre());
        movie.setDirector(movieDetails.getDirector());
        movie.setCast(movieDetails.getCast());
        movie.setRating(movieDetails.getRating());

        try {
            MoviesTable updatedMovie = moviesRepository.save(movie);
            return ResponseEntity.ok(updatedMovie);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete movie REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovieById(@PathVariable Integer id) {
        try {
            moviesRepository.deleteById(id);
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
