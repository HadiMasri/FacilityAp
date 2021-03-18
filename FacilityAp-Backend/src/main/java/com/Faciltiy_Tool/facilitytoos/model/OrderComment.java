package com.Faciltiy_Tool.facilitytoos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "Ordercomments")
public class OrderComment {
    @Id
    private String id;
    private String orderId;
    private List<OrderCommentData> orderCommentData;

    public OrderComment(String id, String orderId, List<OrderCommentData> orderCommentData) {
        this.id = id;
        this.orderId = orderId;
        this.orderCommentData = orderCommentData;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public List<OrderCommentData> getOrderCommentData() {
        return orderCommentData;
    }

    public void setOrderCommentData(List<OrderCommentData> orderCommentData) {
        this.orderCommentData = orderCommentData;
    }
}
