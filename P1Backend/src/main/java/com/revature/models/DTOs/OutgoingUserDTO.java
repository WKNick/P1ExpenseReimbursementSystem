package com.revature.models.DTOs;

import com.revature.models.User;


public class OutgoingUserDTO {

    private int userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String role;

    public OutgoingUserDTO(int userId, String firstName, String lastName, String username, String email, String role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public OutgoingUserDTO(User u) {
        this.userId = u.getUserID();
        this.firstName = u.getFirstName();
        this.lastName = u.getLastName();
        this.username = u.getUsername();
        this.email = u.getEmail();
        this.role = u.getRole();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}