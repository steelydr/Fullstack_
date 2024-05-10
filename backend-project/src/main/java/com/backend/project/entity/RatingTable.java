package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rating")
public class RatingTable {
    @Id
    @Column(name = "userid")
    private int userId;

    @Column(name = "artist_id")
    private int artistId;

    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "game_id")
    private int gameId;

    @Column(name = "rating")
    private double rating;

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getArtistId() {
        return artistId;
    }

    public void setArtistId(int artistId) {
        this.artistId = artistId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    // toString() method
    @Override
    public String toString() {
        return "Rating{" +
                "userId=" + userId +
                ", artistId=" + artistId +
                ", movieId=" + movieId +
                ", gameId=" + gameId +
                ", rating=" + rating +
                '}';
    }
}
