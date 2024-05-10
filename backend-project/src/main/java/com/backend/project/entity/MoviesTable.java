package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class MoviesTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "movie_name")
    private String movieName;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "age_restriction_id")
    private int ageRestrictionId;

    @Column(name = "venue_id")
    private int venueId;

    @Column(name = "genre")
    private String genre;

    @Column(name = "director")
    private String director;

    @Column(name = "mcast")
    private String cast;

    @Column(name = "mrating")
    private double rating;

    // Getters and Setters
    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getAgeRestrictionId() {
        return ageRestrictionId;
    }

    public void setAgeRestrictionId(int ageRestrictionId) {
        this.ageRestrictionId = ageRestrictionId;
    }

    public int getVenueId() {
        return venueId;
    }

    public void setVenueId(int venueId) {
        this.venueId = venueId;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
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
        return "MoviesTable{" +
                "movieId=" + movieId +
                ", movieName='" + movieName + '\'' +
                ", releaseDate='" + releaseDate + '\'' +
                ", ageRestrictionId=" + ageRestrictionId +
                ", venueId=" + venueId +
                ", genre='" + genre + '\'' +
                ", director='" + director + '\'' +
                ", cast='" + cast + '\'' +
                ", rating=" + rating +
                '}';
    }
}
