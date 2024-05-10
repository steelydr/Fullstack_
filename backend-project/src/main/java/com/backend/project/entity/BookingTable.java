package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class BookingTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @Column(name = "userid")
    private int userId;

    @Column(name = "booking_type")
    private int bookingType;

    @Column(name = "venue_id")
    private int venueId;

    @Column(name = "dateb")
    private String dateb; // Changed to String

    @Column(name = "timeb")
    private String timeb; // Changed to String

    @Column(name = "seat_no")
    private int seatNo;

    @Column(name = "booking_status")
    private String bookingStatus;

    @Column(name = "amount")
    private int amount;

    // Getters and Setters
    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookingType() {
        return bookingType;
    }

    public void setBookingType(int bookingType) {
        this.bookingType = bookingType;
    }

    public int getVenueId() {
        return venueId;
    }

    public void setVenueId(int venueId) {
        this.venueId = venueId;
    }

    public String getDateb() {
        return dateb;
    }

    public void setDateb(String dateb) {
        this.dateb = dateb;
    }

    public String getTimeb() {
        return timeb;
    }

    public void setTimeb(String timeb) {
        this.timeb = timeb;
    }

    public int getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(int seatNo) {
        this.seatNo = seatNo;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    // toString() method
    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", userId=" + userId +
                ", bookingType=" + bookingType +
                ", venueId=" + venueId +
                ", dateb='" + dateb + '\'' +
                ", timeb='" + timeb + '\'' +
                ", seatNo=" + seatNo +
                ", bookingStatus='" + bookingStatus + '\'' +
                ", amount=" + amount +
                '}';
    }
}
