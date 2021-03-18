package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.config.EmailConfig;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import com.Faciltiy_Tool.facilitytoos.model.MailSender;
import com.Faciltiy_Tool.facilitytoos.model.MailTemplate;
import com.Faciltiy_Tool.facilitytoos.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
@RequestMapping(path = "/api")
public class MailSenderController {

    private final EmailConfig config;

    @Autowired
    public MailSenderController(EmailConfig config) {
        this.config = config;
    }

    @PostMapping("/mail")
    public void sendMail(@RequestBody MailSender mail) {

        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        // create mail sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(config.getHost());
        mailSender.setPort(config.getPort());
        mailSender.setUsername(config.getUsername());
        mailSender.setPassword(config.getPassword());
        mailSender.setJavaMailProperties(props);


        // create mail instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(mail.getReceiver());
        mailMessage.setText(mail.getContent());
        mailMessage.setSubject("AP Hogeschool");

        // send mail
        mailSender.send(mailMessage);

    }
}
