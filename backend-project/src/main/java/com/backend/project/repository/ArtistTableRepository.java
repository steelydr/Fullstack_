package com.backend.project.repository;

import com.backend.project.entity.ArtistTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistTableRepository extends JpaRepository<ArtistTable, Integer> {

    // Custom query to add artist using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO artists (artist_name, arating) VALUES (:artistName, :rating)", nativeQuery = true)
    void addArtist(String artistName, Double rating);

    // Custom query to get all artists using SQL query
    @Query(value = "SELECT * FROM artists", nativeQuery = true)
    List<ArtistTable> getAllArtists();

    // Custom query to update artist using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE artists SET artist_name = :artistName, arating = :rating WHERE artist_id = :artistId", nativeQuery = true)
    void updateArtist(Integer artistId, String artistName, Double rating);

    // Custom query to delete artist by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM artists WHERE artist_id = :artistId", nativeQuery = true)
    void deleteArtistById(Integer artistId);
}
