package com.revature.controllers;

import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class UserController {

    private UserService us;

    @Autowired
    public UserController(UserService us){ this.us = us; }

    @PostMapping
    public ResponseEntity<OutgoingUserDTO> registerUser(@RequestBody User newUser){
        try {
            OutgoingUserDTO u = us.registerUser(newUser);

            return ResponseEntity.status(201).body(u);
        }catch(Exception e){
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers() {


        List<OutgoingUserDTO> users = us.getAllUsers();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/user={username}")
    public ResponseEntity<OutgoingUserDTO> getUserByEmail(@PathVariable String username){

        return ResponseEntity.ok(us.getUserByUsername(username));
    }

    @GetMapping("/email={email}")
    public ResponseEntity<OutgoingUserDTO> getUserByUsername(@PathVariable String email){

        return ResponseEntity.ok(us.getUserByEmail(email));
    }

    @PatchMapping("/user={userId}")
    public ResponseEntity<Object> updateUser(@RequestBody User newUser, @PathVariable int userId){

        //using our rudimentary error handling thanks to Optional in the Service

        //if the Service returns null, we know the user wasn't found by ID
        OutgoingUserDTO updatedUser = us.updateUser(newUser, userId);

        if(updatedUser == null){
            return ResponseEntity.status(400).body("User not found with ID: " + userId);
        } else {
            return ResponseEntity.ok(updatedUser);
        }

    }

    @DeleteMapping("/user={userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable int userId){

        //using our rudimentary error handling thanks to Optional in the Service

        //if the Service returns null, we know the user wasn't found by ID
        try{
            us.deleteUser(userId);
            return ResponseEntity.status(200).body("User deleted with ID: " + userId);
        }catch(Exception e){
            return ResponseEntity.status(400).body("User not found with ID: " + userId);
        }


    }

    @PatchMapping("/email_{userId}")
    public ResponseEntity<Object> updateEmail(@RequestBody String email, @PathVariable int userId){

        //using our rudimentary error handling thanks to Optional in the Service

        //if the Service returns null, we know the user wasn't found by ID
        OutgoingUserDTO updatedUser = us.updateEmail(email, userId);

        if(updatedUser == null){
            return ResponseEntity.status(400).body("User not found with ID: " + userId);
        } else {
            return ResponseEntity.ok(updatedUser);
        }

    }

//::TODO make a delete to delete a user and their Reimbursements




}
