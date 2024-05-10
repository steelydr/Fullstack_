package com.backend.project.controller;

import com.backend.project.entity.AdminTable;
import com.backend.project.repository.AdminTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin")
public class AdminTableController {
    @Autowired
    private AdminTableRepository adminRepository;

    // Get all admins REST API
    @GetMapping
    public List<AdminTable> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Create admin REST API
    @PostMapping
    public ResponseEntity<AdminTable> createAdmin(@RequestBody AdminTable admin) {
        try {
            AdminTable newAdmin = adminRepository.save(admin);
            return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get admin by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<AdminTable> getAdminById(@PathVariable Long id) {
        AdminTable admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        return ResponseEntity.ok(admin);
    }

    // Update admin REST API
    @PutMapping("/{id}")
    public ResponseEntity<AdminTable> updateAdmin(@PathVariable Long id, @RequestBody AdminTable adminDetails) {
        AdminTable admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        admin.setName(adminDetails.getName());
        admin.setUsername(adminDetails.getUsername());
        admin.setEmail(adminDetails.getEmail());
        admin.setPassword(adminDetails.getPassword());
        admin.setPhoneNumber(adminDetails.getPhoneNumber());
        admin.setRoleId(adminDetails.getRoleId());

        try {
            AdminTable updatedAdmin = adminRepository.save(admin);
            return ResponseEntity.ok(updatedAdmin);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete admin REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminById(@PathVariable Long id) {
        try {
            adminRepository.deleteById(id);
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