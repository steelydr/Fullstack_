package com.backend.project.repository;

import com.backend.project.entity.RoleTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface RoleTableRepository extends JpaRepository<RoleTable, Long> {

    // Custom query to add a role using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO roles (rolename) VALUES (:roleName)", nativeQuery = true)
    void addRole(String roleName);

    // Custom query to get all roles using SQL query
    @Query(value = "SELECT * FROM roles", nativeQuery = true)
    List<RoleTable> getAllRoles();

    // Custom query to update a role using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE roles SET rolename = :roleName WHERE roleid = :roleId", nativeQuery = true)
    void updateRole(Long roleId, String roleName);

    // Custom query to delete a role using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM roles WHERE roleid = :roleId", nativeQuery = true)
    void deleteRoleById(Long roleId);

    @Query(value = "SELECT roleid FROM roles WHERE rolename = :roleName", nativeQuery = true)
    Long getRoleIdByName(String roleName);

}