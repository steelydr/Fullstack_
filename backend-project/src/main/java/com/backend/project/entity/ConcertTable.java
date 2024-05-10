package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "concerts")
public class ConcertTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "concert_id")
    private Integer concertId;

    @Column(name = "artist_id")
    private Integer artistId;

    @Column(name = "venue_id")
    private Integer venueId;

    @Column(name = "concert_name", length = 50)
    private String concertName;

    @Column(name = "concert_date")
    private String concertDate;

    @Column(name = "concert_time")
    private String concertTime;

    // Getters and Setters
    public Integer getConcertId() {
        return concertId;
    }

    public void setConcertId(Integer concertId) {
        this.concertId = concertId;
    }

    public Integer getArtistId() {
        return artistId;
    }

    public void setArtistId(Integer artistId) {
        this.artistId = artistId;
    }

    public Integer getVenueId() {
        return venueId;
    }

    public void setVenueId(Integer venueId) {
        this.venueId = venueId;
    }

    public String getConcertName() {
        return concertName;
    }

    public void setConcertName(String concertName) {
        this.concertName = concertName;
    }

    public String getConcertDate() {
        return concertDate;
    }

    public void setConcertDate(String concertDate) {
        this.concertDate = concertDate;
    }

    public String getConcertTime() {
        return concertTime;
    }

    public void setConcertTime(String concertTime) {
        this.concertTime = concertTime;
    }

    // toString() method
    @Override
    public String toString() {
        return "Concert{" +
                "concertId=" + concertId +
                ", artistId=" + artistId +
                ", venueId=" + venueId +
                ", concertName='" + concertName + '\'' +
                ", concertDate=" + concertDate +
                ", concertTime=" + concertTime +
                '}';
    }
}
