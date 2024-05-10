package com.backend.project.controller;

import com.backend.project.entity.UserTable;
import com.backend.project.repository.UserTableRepository;
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
@RequestMapping("/api/v1/user")
public class UserTableController {
    @Autowired
    private UserTableRepository userRepository;

    @GetMapping
    public List<UserTable> getAllUsers() {
        return userRepository.findAll();
    }

    // Create user REST API
    @PostMapping
    public ResponseEntity<UserTable> createUser(@RequestBody UserTable user) {
        UserTable newUser = new UserTable();
        newUser.setName(user.getName());
        newUser.setUsername(user.getUsername());
        newUser.setDatep(user.getDatep());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setGender(user.getGender());

        try {
            userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTable> getUserById(@PathVariable Long id) {
        UserTable user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserTable> updateUser(@PathVariable Long id, @RequestBody UserTable userDetails) {
        UserTable existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setName(userDetails.getName());
        existingUser.setUsername(userDetails.getUsername());
        existingUser.setDatep(userDetails.getDatep());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPassword(userDetails.getPassword());
        existingUser.setPhoneNumber(userDetails.getPhoneNumber());
        existingUser.setGender(userDetails.getGender());

        try {
            UserTable updatedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(updatedUser);
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