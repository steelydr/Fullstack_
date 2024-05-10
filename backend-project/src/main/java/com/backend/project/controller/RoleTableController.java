package com.backend.project.controller;

import com.backend.project.entity.RoleTable;
import com.backend.project.repository.RoleTableRepository;
import com.backend.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/roles")
public class RoleTableController {
    @Autowired
    private RoleTableRepository roleRepository;

    // Get all roles REST API
    @GetMapping
    public List<RoleTable> getAllRoles() {
        return roleRepository.findAll();
    }

    // Create role REST API
    @PostMapping
    public ResponseEntity<RoleTable> createRole(@RequestBody RoleTable role) {
        try {
            RoleTable newRole = roleRepository.save(role);
            return new ResponseEntity<>(newRole, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Get role by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<RoleTable> getRoleById(@PathVariable Long id) {
        RoleTable role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        return ResponseEntity.ok(role);
    }

    // Update role REST API
    @PutMapping("/{id}")
    public ResponseEntity<RoleTable> updateRole(@PathVariable Long id, @RequestBody RoleTable roleDetails) {
        RoleTable role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));

        role.setRoleName(roleDetails.getRoleName());

        try {
            RoleTable updatedRole = roleRepository.save(role);
            return ResponseEntity.ok(updatedRole);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    // Delete role REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoleById(@PathVariable Long id) {
        try {
            roleRepository.deleteRoleById(id);
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
