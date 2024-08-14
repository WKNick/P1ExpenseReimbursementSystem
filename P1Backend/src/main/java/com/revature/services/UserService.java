package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserDAO userDAO;
    private ReimbursementService rService;

    @Autowired
    public UserService(UserDAO userDAO, ReimbursementService RService) {
        this.userDAO = userDAO;
        this.rService = RService;
    }

    public OutgoingUserDTO registerUser(User newUser){


        //.save() lets us insert data into the DB. We can also use this for updates.
        //It also returns the user in question, so we can save it to a variable
        User u = userDAO.save(newUser);

        return new OutgoingUserDTO(u);

    }

    public List<OutgoingUserDTO> getAllUsers(){

        List<User> users = userDAO.findAll();


        return users.stream()
                .map(OutgoingUserDTO::new)
                .collect(Collectors.toList());
    }

    public OutgoingUserDTO getUserByUsername(String username){

        return new OutgoingUserDTO(userDAO.findByUsername(username));
    }

    public OutgoingUserDTO getUserByEmail(String email){

        return new OutgoingUserDTO(userDAO.findByEmail(email));
    }

    public OutgoingUserDTO updateUser(User newUser, int userId){

        //TODO: error handling, check for valid inputs

        //get the User by id (remember this returns an OPTIONAL!)
        Optional<User> existingUser = userDAO.findById(userId);

        //Remember, .isPresent() checks the optional to see if there's data or if it's null
        if(existingUser.isPresent()) {

            //If the User is present, extract it so we can update it
            User u = existingUser.get();

            //update the existing username with the new username
            u.setRole(newUser.getRole());
            u.setEmail(newUser.getEmail());
            u.setLastName(newUser.getLastName());
            //save it back to the DB thru the DAO, send back the updated User
            return new OutgoingUserDTO(userDAO.save(u));

            //NOTE: the .save() method is used for inserts AND updates
            //How does Spring know to insert vs update? It's based on whether the ID exists or not

        } else {
            //TODO: probably throw an exception
            return null;
        }

    }

    public void deleteUser(int userId){

        //TODO: error handling, check for valid inputs

        //get the User by id (remember this returns an OPTIONAL!)
        Optional<User> existingUser = userDAO.findById(userId);

        //Remember, .isPresent() checks the optional to see if there's data or if it's null
        if(existingUser.isPresent()) {

            //If the User is present, extract it so we can update it
            User u = existingUser.get();

            rService.deleteReimbursementByUserId(u.getUserID());

            userDAO.delete(u);

            //save it back to the DB thru the DAO, send back the updated User


            //NOTE: the .save() method is used for inserts AND updates
            //How does Spring know to insert vs update? It's based on whether the ID exists or not

        } else {
            //TODO: probably throw an exception
            return;
        }
        return;
    }

    public OutgoingUserDTO updateEmail(String newEmail, int userId){

        //TODO: error handling, check for valid inputs

        //get the User by id (remember this returns an OPTIONAL!)
        Optional<User> existingUser = userDAO.findById(userId);

        //Remember, .isPresent() checks the optional to see if there's data or if it's null
        if(existingUser.isPresent()) {

            //If the User is present, extract it so we can update it
            User u = existingUser.get();

            //update the existing username with the new username
            u.setEmail(newEmail);

            //save it back to the DB thru the DAO, send back the updated User
            return new OutgoingUserDTO(userDAO.save(u));

            //NOTE: the .save() method is used for inserts AND updates
            //How does Spring know to insert vs update? It's based on whether the ID exists or not

        } else {
            //TODO: probably throw an exception
            return null;
        }

    }

    //TODO: Delete User
    // call deleteReimbursementByUserId inside of here from Reimbursment service


}