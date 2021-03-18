package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.Order;
import com.Faciltiy_Tool.facilitytoos.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByLocation(String location);
    List<Order> findByRequesterId(String requesterId);
    Order findOneById(String reportId);
    List<Order> getByAssignToId(String userId);

    List<Order> findByCategory(String category);
}
