package com.backend.project.repository;

import com.backend.project.entity.BankTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BankTableRepository extends JpaRepository<BankTable, Integer> {

    // Custom query to find a bank record by pay ID
    BankTable findByPayId(int payId);

    // Custom query to find all bank records
    List<BankTable> findAll();

    // Custom query to insert a new bank record
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO bank (pay_id, amnt, transactions) VALUES (:payId, :amnt, :transactions)", nativeQuery = true)
    void insertBankRecord(int payId, String amnt, String transactions);

    // Custom query to update a bank record
    @Transactional
    @Modifying
    @Query(value = "UPDATE bank SET amnt = :amnt, transactions = :transactions WHERE pay_id = :payId", nativeQuery = true)
    void updateBankRecord(int payId, String amnt, String transactions);

    // Custom query to delete a bank record
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM bank WHERE pay_id = :payId", nativeQuery = true)
    void deleteBankRecord(int payId);
}
