package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "game")
public class GameTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private int gameId;

    @Column(name = "sports_id")
    private int sportsId;

    @Column(name = "venue_id")
    private int venueId;

    @Column(name = "game_date")
    private Date gameDate;

    @Column(name = "opponenta")
    private String opponentA;

    @Column(name = "opponentb")
    private String opponentB;

    @Column(name = "grating")
    private double grating;

    // Getters and Setters
    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getSportsId() {
        return sportsId;
    }

    public void setSportsId(int sportsId) {
        this.sportsId = sportsId;
    }

    public int getVenueId() {
        return venueId;
    }

    public void setVenueId(int venueId) {
        this.venueId = venueId;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public String getOpponentA() {
        return opponentA;
    }

    public void setOpponentA(String opponentA) {
        this.opponentA = opponentA;
    }

    public String getOpponentB() {
        return opponentB;
    }

    public void setOpponentB(String opponentB) {
        this.opponentB = opponentB;
    }

    public double getGrating() {
        return grating;
    }

    public void setGrating(double grating) {
        this.grating = grating;
    }

    // toString() method
    @Override
    public String toString() {
        return "Game{" +
                "gameId=" + gameId +
                ", sportsId=" + sportsId +
                ", venueId=" + venueId +
                ", gameDate=" + gameDate +
                ", opponentA='" + opponentA + '\'' +
                ", opponentB='" + opponentB + '\'' +
                ", grating=" + grating +
                '}';
    }
}
