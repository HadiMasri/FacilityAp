package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.MailTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MailTemplateRepository extends MongoRepository<MailTemplate, String> {
}
