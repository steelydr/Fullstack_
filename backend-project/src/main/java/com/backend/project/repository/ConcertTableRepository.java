package com.backend.project.repository;

import com.backend.project.entity.ConcertTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface ConcertTableRepository extends JpaRepository<ConcertTable, Integer> {

        // Custom query to add a concert using SQL query
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO concerts (artist_id, venue_id, concert_name, concert_date, concert_time) " +
                        "VALUES (:artistId, :venueId, :concertName, :concertDate, :concertTime)", nativeQuery = true)
        void addConcert(Integer artistId, Integer venueId, String concertName, String concertDate,
                        String concertTime);

        // Custom query to get all concerts using SQL query
        @Query(value = "SELECT * FROM concerts", nativeQuery = true)
        List<ConcertTable> getAllConcerts();

        // Custom query to update a concert using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE concerts SET artist_id = :artistId, venue_id = :venueId, concert_name = :concertName, " +
                        "concert_date = :concertDate, concert_time = :concertTime WHERE concert_id = :concertId", nativeQuery = true)
        void updateConcert(Integer concertId, Integer artistId, Integer venueId, String concertName,
                        java.sql.Date concertDate,
                        java.sql.Time concertTime);

        // Custom query to delete a concert using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM concerts WHERE concert_id = :concertId", nativeQuery = true)
        void deleteConcertById(Integer concertId);

        @Query(value = "SELECT * FROM concerts WHERE concert_id = :id", nativeQuery = true)
        ConcertTable getConcertById(Integer id);
}
