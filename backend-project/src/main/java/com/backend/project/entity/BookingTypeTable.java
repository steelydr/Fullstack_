package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookingtype")
public class BookingTypeTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_type")
    private Integer bookingTypeId;

    @Column(name = "bookingname", nullable = false, unique = true)
    private String bookingName;

    // Getters and Setters
    public Integer getBookingTypeId() {
        return bookingTypeId;
    }

    public void setBookingTypeId(Integer bookingTypeId) {
        this.bookingTypeId = bookingTypeId;
    }

    public String getBookingName() {
        return bookingName;
    }

    public void setBookingName(String bookingName) {
        this.bookingName = bookingName;
    }

    // toString() method
    @Override
    public String toString() {
        return "BookingType{" +
                "bookingTypeId=" + bookingTypeId +
                ", bookingName='" + bookingName + '\'' +
                '}';
    }
}
