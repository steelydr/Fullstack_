package com.backend.project.repository;

import com.backend.project.entity.VenueTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueTableRepository extends JpaRepository<VenueTable, Integer> {

    // Custom query to add venue using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO venue (venue_name, location, capacity, contact_info) VALUES (:venueName, :location, :capacity, :contactInfo)", nativeQuery = true)
    void addVenue(String venueName, String location, Integer capacity, String contactInfo);

    // Custom query to get all venues using SQL query
    @Query(value = "SELECT * FROM venue", nativeQuery = true)
    List<VenueTable> getAllVenues();

    // Custom query to update venue using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE venue SET venue_name = :venueName, location = :location, capacity = :capacity, contact_info = :contactInfo WHERE venue_id = :venueId", nativeQuery = true)
    void updateVenue(Integer venueId, String venueName, String location, Integer capacity, String contactInfo);

    // Custom query to delete venue by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM venue WHERE venue_id = :venueId", nativeQuery = true)
    void deleteVenueById(Integer venueId);
}
