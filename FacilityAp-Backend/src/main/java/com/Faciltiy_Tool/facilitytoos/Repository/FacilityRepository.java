package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.Report;
import com.Faciltiy_Tool.facilitytoos.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FacilityRepository extends MongoRepository<Report, String>
{
    List<Report> findByReporterId(String reportedId);
    Report findOneById(String reportId);
    List<Report> getAllByAssignToId(String userId);
    List<Report> findAllByOrderByUpVoteDesc();
    List<Report> getAllBySubscribersContains(String id);
}
