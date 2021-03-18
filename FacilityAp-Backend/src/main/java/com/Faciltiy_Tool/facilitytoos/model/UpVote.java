package com.Faciltiy_Tool.facilitytoos.model;

public class UpVote {
    private Report report;
    private String userId;

    public UpVote(Report report, String userId) {
        this.report = report;
        this.userId = userId;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
