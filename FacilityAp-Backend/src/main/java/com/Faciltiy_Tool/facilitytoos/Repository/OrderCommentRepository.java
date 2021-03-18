package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.OrderComment;
import com.Faciltiy_Tool.facilitytoos.model.ReportComment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderCommentRepository extends MongoRepository<OrderComment,String> {
    public OrderComment findOrderCommentByOrderId (String orderId);
}
