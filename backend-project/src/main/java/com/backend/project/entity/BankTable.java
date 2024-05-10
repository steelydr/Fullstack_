package com.backend.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bank")
public class BankTable {
    @Id
    @Column(name = "pay_id")
    private int payId;

    @Column(name = "amnt")
    private String amnt;

    @Column(name = "transactions")
    private String transactions;

    // Getters and Setters
    public int getPayId() {
        return payId;
    }

    public void setPayId(int payId) {
        this.payId = payId;
    }

    public String getAmnt() {
        return amnt;
    }

    public void setAmnt(String amnt) {
        this.amnt = amnt;
    }

    public String getTransactions() {
        return transactions;
    }

    public void setTransactions(String transactions) {
        this.transactions = transactions;
    }

    // toString() method
    @Override
    public String toString() {
        return "Bank{" +
                "payId=" + payId +
                ", amnt='" + amnt + '\'' +
                ", transactions='" + transactions + '\'' +
                '}';
    }
}
