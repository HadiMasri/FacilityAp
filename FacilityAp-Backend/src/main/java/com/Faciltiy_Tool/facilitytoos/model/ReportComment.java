package com.Faciltiy_Tool.facilitytoos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Reportcomments")
public class ReportComment {
    @Id
    private String id;
    private String reportId;
    private List<ReportCommentData> reportCommentData;

    public ReportComment(String id, String reportId, List<ReportCommentData> reportCommentData) {
        this.id = id;
        this.reportId = reportId;
        this.reportCommentData = reportCommentData;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public List<ReportCommentData> getReportCommentData() {
        return reportCommentData;
    }

    public void setReportCommentData(List<ReportCommentData> reportCommentData) {
        this.reportCommentData = reportCommentData;
    }
}


