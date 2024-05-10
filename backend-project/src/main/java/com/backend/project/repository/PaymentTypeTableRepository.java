package com.backend.project.repository;

import com.backend.project.entity.PaymentTypeTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTypeTableRepository extends JpaRepository<PaymentTypeTable, Integer> {

    // Custom query to add payment type using SQL query
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO paymenttype (type_name) VALUES (:typeName)", nativeQuery = true)
    void addPaymentType(String typeName);

    // Custom query to get all payment types using SQL query
    @Query(value = "SELECT * FROM paymenttype", nativeQuery = true)
    List<PaymentTypeTable> getAllPaymentTypes();

    // Custom query to update payment type using SQL query
    @Transactional
    @Modifying
    @Query(value = "UPDATE paymenttype SET type_name = :typeName WHERE payment_type = :paymentTypeId", nativeQuery = true)
    void updatePaymentType(Integer paymentTypeId, String typeName);

    // Custom query to delete payment type by ID using SQL query
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM paymenttype WHERE payment_type = :paymentTypeId", nativeQuery = true)
    void deletePaymentTypeById(Integer paymentTypeId);
}
