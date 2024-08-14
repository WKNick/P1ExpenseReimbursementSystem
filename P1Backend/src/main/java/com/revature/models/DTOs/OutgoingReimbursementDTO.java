package com.revature.models.DTOs;


import com.revature.models.Reimbursement;

public class OutgoingReimbursementDTO {

    private int reimbursementId;
    private String description;
    private double amount;
    private String status;
    private OutgoingUserDTO user;


    public OutgoingReimbursementDTO() {
    }

    public OutgoingReimbursementDTO(Reimbursement r){
        this.reimbursementId = r.getReimbursementID();
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
        this.user = new OutgoingUserDTO(r.getUser());
    }

    public OutgoingReimbursementDTO(int reimbursementId, String description, double amount, String status, OutgoingUserDTO user) {
        this.reimbursementId = reimbursementId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
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

    public OutgoingUserDTO getUser() {
        return user;
    }

    public void setUser(OutgoingUserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "OutgoingReimbursementDTO{" +
                "reimbursementId=" + reimbursementId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}