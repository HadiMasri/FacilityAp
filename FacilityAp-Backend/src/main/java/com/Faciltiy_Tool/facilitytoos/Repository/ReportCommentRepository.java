package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.ReportComment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportCommentRepository extends MongoRepository<ReportComment,String> {
    public ReportComment findCommentByReportId(String reportId);
}
