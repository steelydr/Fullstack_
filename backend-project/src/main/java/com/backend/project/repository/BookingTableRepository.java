package com.backend.project.repository;

import com.backend.project.entity.BookingTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface BookingTableRepository extends JpaRepository<BookingTable, Long> {

        // Custom query to add a booking using SQL query
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO booking (userid, booking_type, venue_id, dateb, timeb, seat_no, booking_status, amount) "
                        +
                        "VALUES (:userId, :bookingType, :venueId, :dateb, :timeb, :seatNo, :bookingStatus, :amount)", nativeQuery = true)
        void addBooking(int userId, int bookingType, int venueId, String dateb, String timeb, int seatNo,
                        String bookingStatus, int amount);

        // Custom query to get all bookings using SQL query
        @Query(value = "SELECT * FROM booking", nativeQuery = true)
        List<BookingTable> getAllBookings();

        // Custom query to update a booking using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE booking SET userid = :userId, booking_type = :bookingType, venue_id = :venueId, " +
                        "dateb = :dateb, timeb = :timeb, seat_no = :seatNo, booking_status = :bookingStatus, amount = :amount "
                        +
                        "WHERE booking_id = :bookingId", nativeQuery = true)
        void updateBooking(int bookingId, int userId, int bookingType, int venueId, String dateb, String timeb,
                        int seatNo, String bookingStatus, int amount);

        // Custom query to delete a booking using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM booking WHERE booking_id = :id", nativeQuery = true)
        void deleteBookingById(Long id);
}
