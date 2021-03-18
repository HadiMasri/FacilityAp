package com.Faciltiy_Tool.facilitytoos.model;

public class MailSender {
    private String Id;
    private String receiver;
    private String content;

    public MailSender() {
    }

    public MailSender(String receiver, String content) {
        this.receiver = receiver;
        this.content = content;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
