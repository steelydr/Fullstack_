package com.backend.project.repository;

import com.backend.project.entity.UserTable;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTableRepository extends JpaRepository<UserTable, Long> {

        // Custom query to add user using SQL query
        @Query(value = "INSERT INTO user (name, username, date, email, password, phone_number, gender) " +
                        "VALUES (:name, :username, :date, :email, :password, :phoneNumber, :gender)", nativeQuery = true)
        void addUser(String name, String username, String date, String email, String password,
                        String phoneNumber, String gender);

        // Custom query to get all users using SQL query
        @Query(value = "SELECT * FROM user", nativeQuery = true)
        List<UserTable> getAllUsers();

        // Custom query to update user using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE user SET name = :name, username = :username, date = :date, email = :email, password = :password, phone_number = :phoneNumber, gender = :gender WHERE id = :id", nativeQuery = true)
        void updateUser(Long id, String name, String username, String date, String email, String password,
                        String phoneNumber, String gender);

        // Custom query to delete user using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM user WHERE id = :id", nativeQuery = true)
        void deleteUserById(Long id);
}
