package com.backend.project.repository;

import com.backend.project.entity.MoviesTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface MoviesTableRepository extends JpaRepository<MoviesTable, Integer> {

        // Custom query to add a movie using SQL query
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO movies (movie_name, release_date, age_restriction_id, venue_id, genre, director, mcast, mrating) "
                        +
                        "VALUES (:movieName, :releaseDate, :ageRestrictionId, :venueId, :genre, :director, :cast, :rating)", nativeQuery = true)
        void addMovie(String movieName, String releaseDate, int ageRestrictionId, int venueId, String genre,
                        String director, String cast, double rating);

        // Custom query to get all movies using SQL query
        @Query(value = "SELECT * FROM movies", nativeQuery = true)
        List<MoviesTable> getAllMovies();

        // Custom query to update a movie using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE movies SET movie_name = :movieName, release_date = :releaseDate, " +
                        "age_restriction_id = :ageRestrictionId, venue_id = :venueId, genre = :genre, " +
                        "director = :director, mcast = :cast, mrating = :rating WHERE movie_id = :movieId", nativeQuery = true)
        void updateMovie(Integer movieId, String movieName, String releaseDate, int ageRestrictionId, int venueId,
                        String genre, String director, String cast, double rating);

        // Custom query to delete a movie using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM movies WHERE movie_id = :movieId", nativeQuery = true)
        void deleteMovieById(Integer movieId);

        @Query(value = "SELECT * FROM movies WHERE movie_id = :id", nativeQuery = true)
        MoviesTable getMovieById(Integer id);
}
