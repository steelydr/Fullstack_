package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "age_restriction")
public class AgeRestrictionTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "age_restriction_id")
    private Integer ageRestrictionId;

    @Column(name = "age_restriction_name", nullable = false)
    private String ageRestrictionName;

    // Getters and Setters
    public Integer getAgeRestrictionId() {
        return ageRestrictionId;
    }

    public void setAgeRestrictionId(Integer ageRestrictionId) {
        this.ageRestrictionId = ageRestrictionId;
    }

    public String getAgeRestrictionName() {
        return ageRestrictionName;
    }

    public void setAgeRestrictionName(String ageRestrictionName) {
        this.ageRestrictionName = ageRestrictionName;
    }

    // toString() method
    @Override
    public String toString() {
        return "AgeRestriction{" +
                "ageRestrictionId=" + ageRestrictionId +
                ", ageRestrictionName='" + ageRestrictionName + '\'' +
                '}';
    }
}
