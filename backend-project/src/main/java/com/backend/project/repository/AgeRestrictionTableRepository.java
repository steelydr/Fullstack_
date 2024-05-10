package com.backend.project.repository;

import com.backend.project.entity.AgeRestrictionTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeRestrictionTableRepository extends JpaRepository<AgeRestrictionTable, Integer> {

    // Custom query to add age restriction using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO age_restriction (age_restriction_name) VALUES (:ageRestrictionName)", nativeQuery = true)
    void addAgeRestriction(String ageRestrictionName);

    // Custom query to get all age restrictions using SQL query
    @Query(value = "SELECT * FROM age_restriction", nativeQuery = true)
    List<AgeRestrictionTable> getAllAgeRestrictions();

    // Custom query to update age restriction using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE age_restriction SET age_restriction_name = :ageRestrictionName WHERE age_restriction_id = :ageRestrictionId", nativeQuery = true)
    void updateAgeRestriction(Integer ageRestrictionId, String ageRestrictionName);

    // Custom query to delete age restriction by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM age_restriction WHERE age_restriction_id = :ageRestrictionId", nativeQuery = true)
    void deleteAgeRestrictionById(Integer ageRestrictionId);
}
