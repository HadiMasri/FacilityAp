package com.Faciltiy_Tool.facilitytoos.model;

public class AssignOrder {
    private User assignTo;
    private ExternalFirms assignToFirm;
    private String requesterId;
    private String orderId;

    public AssignOrder(User assignTo, ExternalFirms assignToFirm, String requesterId, String  orderId) {
        this.assignTo = assignTo;
        this.assignToFirm = assignToFirm;
        this.requesterId = requesterId;
        this.orderId = orderId;
    }

    public User getAssignTo() {
        return assignTo;
    }

    public void setAssignTo(User assignTo) {
        this.assignTo = assignTo;
    }

    public ExternalFirms getAssignToFirm() {
        return assignToFirm;
    }

    public void setAssignToFirm(ExternalFirms assignToFirm) {
        this.assignToFirm = assignToFirm;
    }

    public String getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(String requesterId) {
        this.requesterId = requesterId;
    }

    public String getRequestId() {
        return orderId;
    }

    public void setRequestId(String orderId) {
        this.orderId = orderId;
    }
}
