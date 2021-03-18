package com.Faciltiy_Tool.facilitytoos.model;

import com.Faciltiy_Tool.facilitytoos.Repository.ExternalFirmsRepository;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "externalfirms")
public class ExternalFirms {
    @Id
    private String id;
    private String email;
    private  String displayName;
    private  String telefonNr;
    private String role;
    private ExternalFirmsRepository externalFirmsRepository;



    public ExternalFirms(String email, String displayName, String telefonNr, String role) {
        this.email = email;
        this.displayName = displayName;
        this.telefonNr = telefonNr;
        this.role = role;
        //this.externalFirmsRepository = externalFirmsRepository;
    }
    public  ExternalFirms() {

    }

    public String  getTelefonNr() {
        return telefonNr;
    }

    public void setTelefonNr(String telefonNr) {
        this.telefonNr = telefonNr;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
         this.email= email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    //    public ExternalFirmsRepository getExternalFirmsRepository() {
//        return externalFirmsRepository;
//    }
//
//    public void setExternalFirmsRepository(ExternalFirmsRepository externalFirmsRepository) {
//        this.externalFirmsRepository = externalFirmsRepository;
//    }

    public void checkExternalFirms(String email, String displayName , String telefonNr, ExternalFirms externalFirms) {
        // Indien een attribuut verschilt met het origineel object, update de attribuut
        if (!email.equals(externalFirms.getEmail())) {
            externalFirms.setEmail(email);
        }
        if (!displayName.equals(externalFirms.getDisplayName())) {
            externalFirms.setDisplayName(displayName);
        }
        if (!telefonNr.equals(externalFirms.getTelefonNr())) {
            externalFirms.setTelefonNr(telefonNr);
        }
    }



}
