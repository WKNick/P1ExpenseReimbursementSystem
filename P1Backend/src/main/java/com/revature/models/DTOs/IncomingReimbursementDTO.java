package com.revature.models.DTOs;

public class IncomingReimbursementDTO {

    private String description;
    private double amount;
    private String status;
    private int userID;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, double amount, String status, int userID) {
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userID = userID;
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

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userID=" + userID +
                '}';
    }
}
