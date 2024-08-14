package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.DTOs.OutgoingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReimbursementService {

    private ReimbursementDAO rDAO;
    private UserDAO uDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, UserDAO uDAO){
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }

    public OutgoingReimbursementDTO addReimbursement(IncomingReimbursementDTO r){

        Reimbursement reimbursement = new Reimbursement(r);

        Optional<User> u = uDAO.findById(r.getUserID());

        if(u.isPresent()){
            reimbursement.setUser(u.get());
            Reimbursement reimb = rDAO.save(reimbursement);
            return new OutgoingReimbursementDTO(reimb);
        }else{
            return null;
        }
    }

    public OutgoingReimbursementDTO updateReimbursement(IncomingReimbursementDTO r, int reimbursementId){

        Optional<Reimbursement> existingReimbursementOpt = rDAO.findById(reimbursementId);

        if(existingReimbursementOpt.isPresent()){
            Reimbursement reimbursement = existingReimbursementOpt.get();
            reimbursement.setDescription(r.getDescription());
            reimbursement.setStatus(r.getStatus());
            return new OutgoingReimbursementDTO(rDAO.save(reimbursement));
        }else{
            return null;
        }
    }

    public List<OutgoingReimbursementDTO> getAllReimbursements(){
        List<Reimbursement> r = rDAO.findAll();
        return r.stream()
                .map(OutgoingReimbursementDTO::new)
                .collect(Collectors.toList());
    }


    public List<OutgoingReimbursementDTO> getReimbursementByUserId(int userId){
        List<Reimbursement> r = rDAO.findByUserUserId(userId);
        return r.stream()
                .map(OutgoingReimbursementDTO::new)
                .collect(Collectors.toList());
    }

    public void deleteReimbursementByUserId(int userId){
        List<Reimbursement> rl = rDAO.findByUserUserId(userId);
        for(Reimbursement r: rl){
            r.getUser().getReimbursements().remove(r);

            rDAO.deleteById(r.getReimbursementID());
        }
    }

}
