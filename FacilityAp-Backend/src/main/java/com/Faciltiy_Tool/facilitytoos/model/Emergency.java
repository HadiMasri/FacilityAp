package com.Faciltiy_Tool.facilitytoos.model;


import com.Faciltiy_Tool.facilitytoos.Repository.EmergencyRepository;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emergencies")
public class Emergency {
    @Id
    private String id;
    private String department;
    private String name;
    private String description;
    private String email;
    private String telephone;
    private String mobile;

    public Emergency() {

    }

    public Emergency(String department, String name, String description, String email, String telephone, String mobile) {
        this.department = department;
        this.name = name;
        this.description = description;
        this.email = email;
        this.telephone = telephone;
        this.mobile = mobile;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public void checkEmergencyContact(String department, String name, String description, String email, String telephone, String mobile, Emergency emergency) {
        if (!department.equals(emergency.getDepartment())) {
            emergency.setDepartment(department);
        }
        if (!name.equals(emergency.getName())) {
            emergency.setName(name);
        }
        if (!description.equals(emergency.getDescription())) {
            emergency.setDescription(description);
        }
        if (!email.equals(emergency.getEmail())) {
            emergency.setEmail(email);
        }
        if (!telephone.equals(emergency.getTelephone())) {
            emergency.setTelephone(telephone);
        }
        if (!mobile.equals(emergency.getMobile())) {
            emergency.setMobile(mobile);
        }
    }
}
