package com.revature.models;

import com.revature.models.DTOs.IncomingReimbursementDTO;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "reimbursements")
@Component
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbursementId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, columnDefinition = "double precision check (amount > 0)")
    private double amount;

    @Column(nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId") //reference to the PK in User
    private User user;


    public Reimbursement() {
    }

    public Reimbursement(IncomingReimbursementDTO r) {
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
    }

    public Reimbursement(int reimbursementId, String description, double amount, String status, User user) {
        this.reimbursementId = reimbursementId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbursementID() {
        return reimbursementId;
    }

    public void setReimbursementID(int reimbursementID) {
        this.reimbursementId = reimbursementID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbursementID=" + reimbursementId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
