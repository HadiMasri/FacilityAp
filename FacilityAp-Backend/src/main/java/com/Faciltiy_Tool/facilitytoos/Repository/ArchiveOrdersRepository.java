package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.ArchiveOrders;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArchiveOrdersRepository extends MongoRepository<ArchiveOrders, String> {
}
