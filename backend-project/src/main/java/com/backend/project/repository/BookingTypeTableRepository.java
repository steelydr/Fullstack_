package com.backend.project.repository;

import com.backend.project.entity.BookingTypeTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingTypeTableRepository extends JpaRepository<BookingTypeTable, Integer> {

    // Custom query to add booking type using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO bookingtype (bookingname) VALUES (:bookingName)", nativeQuery = true)
    void addBookingType(String bookingName);

    // Custom query to get all booking types using SQL query
    @Query(value = "SELECT * FROM bookingtype", nativeQuery = true)
    List<BookingTypeTable> getAllBookingTypes();

    // Custom query to update booking type using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE bookingtype SET bookingname = :bookingName WHERE booking_type = :bookingTypeId", nativeQuery = true)
    void updateBookingType(Integer bookingTypeId, String bookingName);

    // Custom query to delete booking type by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM bookingtype WHERE booking_type = :bookingTypeId", nativeQuery = true)
    void deleteBookingTypeById(Integer bookingTypeId);
}
