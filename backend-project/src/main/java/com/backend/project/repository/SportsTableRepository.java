package com.backend.project.repository;

import com.backend.project.entity.SportsTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SportsTableRepository extends JpaRepository<SportsTable, Integer> {

    // Custom query to add sports using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO sports (sports_name) VALUES (:sportsName)", nativeQuery = true)
    void addSports(String sportsName);

    // Custom query to get all sports using SQL query
    @Query(value = "SELECT * FROM sports", nativeQuery = true)
    List<SportsTable> getAllSports();

    // Custom query to update sports using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE sports SET sports_name = :sportsName WHERE sports_id = :sportsId", nativeQuery = true)
    void updateSports(Integer sportsId, String sportsName);

    // Custom query to delete sports by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM sports WHERE sports_id = :sportsId", nativeQuery = true)
    void deleteSportsById(Integer sportsId);
}
