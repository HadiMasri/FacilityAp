package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.Category;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;


public interface ExternalFirmsRepository extends MongoRepository<ExternalFirms, String> {

}
