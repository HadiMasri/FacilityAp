package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.Emergency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmergencyRepository extends MongoRepository<Emergency, String> {
    List<Emergency> findByDepartment(String department);
}
