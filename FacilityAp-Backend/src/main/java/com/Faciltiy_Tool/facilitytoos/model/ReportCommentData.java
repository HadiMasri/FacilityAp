package com.Faciltiy_Tool.facilitytoos.model;


import java.time.LocalDate;


public class ReportCommentData {


        private String createdByName;
        private String createdById;
        private String text;
        private LocalDate createdOn;

    public ReportCommentData(String createdByName, String createdById, String text) {
        this.createdByName = createdByName;
        this.createdById = createdById;
        this.text = text;
        this.createdOn = LocalDate.now();
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }

    public String getCreatedById() {
        return createdById;
    }

    public void setCreatedById(String createdById) {
        this.createdById = createdById;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }
}
