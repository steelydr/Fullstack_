package com.backend.project.controller;

import com.backend.project.entity.GameTable;
import com.backend.project.repository.GameTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/game")
public class GameTableController {
    @Autowired
    private GameTableRepository gameRepository;

    // Get all games REST API
    @GetMapping
    public List<GameTable> getAllGames() {
        return gameRepository.findAll();
    }

    // Create game REST API
    @PostMapping
    public ResponseEntity<GameTable> createGame(@RequestBody GameTable game) {
        try {
            GameTable newGame = gameRepository.save(game);
            return new ResponseEntity<>(newGame, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get game by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<GameTable> getGameById(@PathVariable Integer id) {
        GameTable game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + id));
        return ResponseEntity.ok(game);
    }

    // Update game REST API
    @PutMapping("/{id}")
    public ResponseEntity<GameTable> updateGame(@PathVariable Integer id, @RequestBody GameTable gameDetails) {
        GameTable game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + id));

        game.setSportsId(gameDetails.getSportsId());
        game.setVenueId(gameDetails.getVenueId());
        game.setGameDate(gameDetails.getGameDate());
        game.setOpponentA(gameDetails.getOpponentA());
        game.setOpponentB(gameDetails.getOpponentB());
        game.setGrating(gameDetails.getGrating());

        try {
            GameTable updatedGame = gameRepository.save(game);
            return ResponseEntity.ok(updatedGame);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete game REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGameById(@PathVariable Integer id) {
        try {
            gameRepository.deleteById(id);
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
