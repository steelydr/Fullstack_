package com.backend.project.repository;

import com.backend.project.entity.AdminTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface AdminTableRepository extends JpaRepository<AdminTable, Long> {

        // Custom query to add an admin using SQL query
        @Transactional
        @Modifying
        @Query(value = "INSERT INTO admin (aname, ausername, aemail, apassword, aphoneno, roleid) " +
                        "VALUES (:name, :username, :email, :password, :phoneNumber, :roleId)", nativeQuery = true)
        void addAdmin(String name, String username, String email, String password, String phoneNumber, Long roleId);

        // Custom query to get all admins using SQL query
        @Query(value = "SELECT * FROM admin", nativeQuery = true)
        List<AdminTable> getAllAdmins();

        // Custom query to update an admin using SQL query
        @Transactional
        @Modifying
        @Query(value = "UPDATE admin SET aname = :name, ausername = :username, aemail = :email, " +
                        "apassword = :password, aphoneno = :phoneNumber, roleid = :roleId WHERE adminid = :adminId", nativeQuery = true)
        void updateAdmin(Long adminId, String name, String username, String email, String password, String phoneNumber,
                        Long roleId);

        // Custom query to delete an admin using SQL query
        @Transactional
        @Modifying
        @Query(value = "DELETE FROM admin WHERE adminid = :adminId", nativeQuery = true)
        void deleteAdminById(Long adminId);
}
