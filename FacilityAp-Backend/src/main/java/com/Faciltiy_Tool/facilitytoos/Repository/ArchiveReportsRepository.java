package com.Faciltiy_Tool.facilitytoos.Repository;
import com.Faciltiy_Tool.facilitytoos.model.ArchiveReports;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ArchiveReportsRepository extends MongoRepository<ArchiveReports, String> {

    List<ArchiveReports> getAllBySubscribersContains(String id);
    ArchiveReports findOneById(String reportId);

}