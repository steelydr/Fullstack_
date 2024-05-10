package com.backend.project.repository;

import com.backend.project.entity.PaymentTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface PaymentTableRepository extends JpaRepository<PaymentTable, Long> {

        // Custom query to find payments by user id
        @Query(value = "SELECT * FROM payment WHERE userid = :userId", nativeQuery = true)
        List<PaymentTable> findPaymentsByUserId(int userId);

        // Custom query to find payments by booking id
        @Query(value = "SELECT * FROM payment WHERE booking_id = :bookingId", nativeQuery = true)
        List<PaymentTable> findPaymentsByBookingId(int bookingId);

        // Custom query to find payments by payment date
        @Query(value = "SELECT * FROM payment WHERE payment_date = :paymentDate", nativeQuery = true)
        List<PaymentTable> findPaymentsByPaymentDate(Date paymentDate);

        // Custom query to find payments by payment status
        @Query(value = "SELECT * FROM payment WHERE payment_status = :paymentStatus", nativeQuery = true)
        List<PaymentTable> findPaymentsByPaymentStatus(String paymentStatus);

        // Custom query to update payment status by payment id
        @Transactional
        @Modifying
        @Query(value = "UPDATE payment SET payment_status = :paymentStatus WHERE payment_id = :paymentId", nativeQuery = true)
        void updatePaymentStatusById(int paymentId, String paymentStatus);

        // Custom query to delete a payment by payment id
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM payment WHERE payment_id = :paymentId", nativeQuery = true)
        void deletePaymentById(int paymentId);

        // Custom query to insert a new payment
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO payment (booking_id, userid, payment_date, payment_time, payment_type, amount, payment_status) "
                        +
                        "VALUES (:bookingId, :userId, :paymentDate, :paymentTime, :paymentType, :amount, :paymentStatus)", nativeQuery = true)
        void insertPayment(int bookingId, int userId, Date paymentDate, String paymentTime, int paymentType, int amount,
                        String paymentStatus);
}
