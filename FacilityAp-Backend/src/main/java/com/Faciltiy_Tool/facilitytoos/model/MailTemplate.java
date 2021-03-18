package com.Faciltiy_Tool.facilitytoos.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="mailtemplates")
public class MailTemplate {
    @Id
    private String id;
    private String firmName;
    private String body;
    private String hyperlink;
    private String signature;

    public MailTemplate() {
    }

    public MailTemplate(String firmName, String body, String hyperlink, String signature) {
        this.firmName = firmName;
        this.body = body;
        this.hyperlink = hyperlink;
        this.signature = signature;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getHyperlink() {
        return hyperlink;
    }

    public void setHyperlink(String hyperlink) {
        this.hyperlink = hyperlink;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
