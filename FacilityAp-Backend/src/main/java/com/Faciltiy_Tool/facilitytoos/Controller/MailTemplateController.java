package com.Faciltiy_Tool.facilitytoos.Controller;


import com.Faciltiy_Tool.facilitytoos.Repository.MailTemplateRepository;
import com.Faciltiy_Tool.facilitytoos.model.MailTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api")
public class MailTemplateController {

    private final MailTemplateRepository repository;

    @Autowired
    public MailTemplateController(MailTemplateRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/mailtemplate")
    public List<MailTemplate> getMailTemplates() {
        return repository.findAll();
    }


    @PostMapping("/mailtemplate")
    public ResponseEntity<MailTemplate> saveTemplate(@RequestBody MailTemplate template) {
        repository.save(template);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/mailtemplate/{id}")
    public MailTemplate updateTemplate(@PathVariable String id,@RequestBody MailTemplate template) {
        Optional<MailTemplate> optionalMailTemplate = repository.findById(id);
        MailTemplate mailTemplate;


        if (optionalMailTemplate.isPresent()) {
            mailTemplate = optionalMailTemplate.get();
        } else {
            return null;
        }

        try {

            if (!template.getFirmName().equals(mailTemplate.getFirmName())) {
                mailTemplate.setFirmName(template.getFirmName());
            }
            if (!template.getBody().equals(mailTemplate.getBody())) {
                mailTemplate.setBody(template.getBody());
            }
            if (!template.getHyperlink().equals(mailTemplate.getHyperlink())) {
                mailTemplate.setHyperlink(template.getHyperlink());
            }
            if (!template.getSignature().equals(mailTemplate.getSignature())) {
                mailTemplate.setSignature(template.getSignature());
            }

            repository.save(mailTemplate);

            return mailTemplate;
        } catch (Exception ex) {
            return null;
        }
    }


    @GetMapping("/mailtemplate/{id}")
    public Optional<MailTemplate> getTemplateById(@PathVariable String id) {
        return repository.findById(id);
    }
}
