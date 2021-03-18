package com.Faciltiy_Tool.facilitytoos.model;

public class AssignReport {
    private User assignTo;
    private ExternalFirms assignToFirm;
    private String reporterId;
    private String reportId;

    public AssignReport(User azureUser, ExternalFirms assignToFirm, String reporterId, String reportId) {
        this.assignTo = azureUser;
        this.assignToFirm = assignToFirm;
        this.reporterId = reporterId;
        this.reportId = reportId;
    }

    public User getAssignTo() {
        return assignTo;
    }

    public void setAssignTo(User assignTo) {
        this.assignTo = assignTo;
    }

    public ExternalFirms getAssignToFirm() {
        return assignToFirm;
    }

    public void setAssignToFirm(ExternalFirms assignToFirm) {
        this.assignToFirm = assignToFirm;
    }

    public String getReporterId() {
        return reporterId;
    }

    public void setReporterId(String reporterId) {
        this.reporterId = reporterId;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }
}
