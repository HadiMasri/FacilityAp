package com.Faciltiy_Tool.facilitytoos.Controller;
import com.Faciltiy_Tool.facilitytoos.Repository.EmergencyRepository;
import com.Faciltiy_Tool.facilitytoos.model.Emergency;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/api")
public class EmergencyController {

    private final EmergencyRepository repository;

    @Autowired
    public EmergencyController(EmergencyRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Functie om alle emergency contacten in de mongo database op te halen
     */
    @GetMapping("/contacts")
    public List<Emergency> getEmergencyContacts() {
        return repository.findAll();
    }


    /**
     *
     * @param contactForm
     * @return
     */
    @PostMapping("/contacts")
    public Emergency saveContact(@RequestParam(value = "contact") String contactForm) {
        try {
            Emergency dto = objectMapper.readValue(contactForm, Emergency.class);

            Emergency contact = new Emergency(dto.getDepartment(), dto.getName(), dto.getDescription(), dto.getEmail(), dto.getTelephone(), dto.getMobile());
            repository.save(contact);
            return contact;
        } catch (Exception e) {
            return null;

        }
    }

    @GetMapping("/contacts/{id}")
    public Optional<Emergency> getContactsById(@PathVariable String id) {
        return repository.findById(id);
    }

    @DeleteMapping("/contacts/{id}")
    public Boolean deleteContact(@PathVariable String id) {
        if(id == null){
            return false;
        } else {
            repository.deleteById(id);
            return true;
        }
    }

    @PutMapping("/contacts/{id}")
    public Emergency updateContact(@PathVariable String id,@RequestBody Emergency contact) {
        Optional<Emergency> optionalEmergency = repository.findById(id);
        Emergency emergency;


        if (optionalEmergency.isPresent()) {
            emergency = optionalEmergency.get();
        } else {
            return null;
        }

        try {


            if (!contact.getDepartment().equals(emergency.getDepartment())) {
                emergency.setDepartment(contact.getDepartment());
            }
            if (!contact.getName().equals(emergency.getName())) {
                emergency.setName(contact.getName());
            }
            if (!contact.getDescription().equals(emergency.getDescription())) {
                emergency.setDescription(contact.getDescription());
            }
            if (!contact.getEmail().equals(emergency.getEmail())) {
                emergency.setEmail(contact.getEmail());
            }
            if (!contact.getTelephone().equals(emergency.getTelephone())) {
                emergency.setTelephone(contact.getTelephone());
            }
            if (!contact.getMobile().equals(emergency.getMobile())) {
                emergency.setMobile(contact.getMobile());
            }

            repository.save(emergency);

            return emergency;
        } catch (Exception ex) {
            return null;
        }
    }

    @GetMapping("contacts/department/{department}")
    public List<Emergency> getContactsByDepartment(@PathVariable String department) {
        return repository.findByDepartment(department);
    }
}
