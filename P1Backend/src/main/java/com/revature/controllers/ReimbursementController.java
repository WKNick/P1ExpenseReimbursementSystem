package com.revature.controllers;

import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.DTOs.OutgoingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class ReimbursementController {

    private ReimbursementService rs;

    @Autowired
    public ReimbursementController(ReimbursementService rs){ this.rs = rs;}

    @PostMapping
    public ResponseEntity<OutgoingReimbursementDTO> addReimbursement(@RequestBody IncomingReimbursementDTO newReimbursement){

        try{
            OutgoingReimbursementDTO r = rs.addReimbursement(newReimbursement);
            return ResponseEntity.status(201).body(r);
        }catch(Exception e){
            return ResponseEntity.status(404).body(null);
        }
    }

    @PatchMapping("/reimbursement={reimbursementID}")
    public ResponseEntity<OutgoingReimbursementDTO> updateReimbursement(@RequestBody IncomingReimbursementDTO newReimbursement, @PathVariable int reimbursementID){


        try{
            OutgoingReimbursementDTO r = rs.updateReimbursement(newReimbursement, reimbursementID);
            return ResponseEntity.status(201).body(r);
        }catch(Exception e){
            return ResponseEntity.status(404).body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllReimbursements(){
        List<OutgoingReimbursementDTO> r = rs.getAllReimbursements();
        return ResponseEntity.ok(r);
    }

    @GetMapping("/user={userID}")
    public ResponseEntity<List<OutgoingReimbursementDTO>> getReimbursementsById(@PathVariable int userID){

        List<OutgoingReimbursementDTO> r = rs.getReimbursementByUserId(userID);

        return ResponseEntity.ok(r);
    }

}
