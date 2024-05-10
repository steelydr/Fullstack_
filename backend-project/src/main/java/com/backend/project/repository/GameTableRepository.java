package com.backend.project.repository;

import com.backend.project.entity.GameTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface GameTableRepository extends JpaRepository<GameTable, Integer> {

    // Custom query to add a game using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO game (sports_id, venue_id, game_date, opponenta, opponentb, grating) " +
            "VALUES (:sportsId, :venueId, :gameDate, :opponentA, :opponentB, :grating)", nativeQuery = true)
    void addGame(Integer sportsId, Integer venueId, java.sql.Date gameDate, String opponentA, String opponentB,
            double grating);

    // Custom query to get all games using SQL query
    @Query(value = "SELECT * FROM game", nativeQuery = true)
    List<GameTable> getAllGames();

    // Custom query to update a game using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE game SET sports_id = :sportsId, venue_id = :venueId, game_date = :gameDate, " +
            "opponenta = :opponentA, opponentb = :opponentB, grating = :grating WHERE game_id = :gameId", nativeQuery = true)
    void updateGame(Integer gameId, Integer sportsId, Integer venueId, java.sql.Date gameDate, String opponentA,
            String opponentB, double grating);

    // Custom query to delete a game using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM game WHERE game_id = :gameId", nativeQuery = true)
    void deleteGameById(Integer gameId);

    @Query(value = "SELECT * FROM game WHERE game_id = :id", nativeQuery = true)
    GameTable getGameById(Integer id);
}
