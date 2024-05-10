package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sports")
public class SportsTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_id")
    private Integer sportsId;

    @Column(name = "sports_name", unique = true)
    private String sportsName;

    // Getters and Setters
    public Integer getSportsId() {
        return sportsId;
    }

    public void setSportsId(Integer sportsId) {
        this.sportsId = sportsId;
    }

    public String getSportsName() {
        return sportsName;
    }

    public void setSportsName(String sportsName) {
        this.sportsName = sportsName;
    }

    // toString() method
    @Override
    public String toString() {
        return "Sports{" +
                "sportsId=" + sportsId +
                ", sportsName='" + sportsName + '\'' +
                '}';
    }
}
