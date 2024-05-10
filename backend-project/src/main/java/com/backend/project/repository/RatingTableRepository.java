package com.backend.project.repository;

import com.backend.project.entity.RatingTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RatingTableRepository extends JpaRepository<RatingTable, Integer> {

        // Custom query to get all users using SQL query
        @Query(value = "SELECT * FROM rating", nativeQuery = true)
        List<RatingTable> getAllRating();

        // Custom query to add rating using SQL query
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO rating (userid, artist_id, movie_id, game_id, rating) " +
                        "VALUES (:userId, :artistId, :movieId, :gameId, :rating)", nativeQuery = true)
        void addRating(int userId, int artistId, int movieId, int gameId, double rating);

        // Custom query to update rating using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE rating SET rating = :rating " +
                        "WHERE userid = :userId AND artist_id = :artistId AND movie_id = :movieId AND game_id = :gameId", nativeQuery = true)
        void updateRating(int userId, int artistId, int movieId, int gameId, double rating);

        // Custom query to delete rating using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM rating WHERE userid = :userId AND artist_id = :artistId AND movie_id = :movieId AND game_id = :gameId", nativeQuery = true)
        void deleteRating(int userId, int artistId, int movieId, int gameId);

        List<RatingTable> findByUserId(int userId);

}
