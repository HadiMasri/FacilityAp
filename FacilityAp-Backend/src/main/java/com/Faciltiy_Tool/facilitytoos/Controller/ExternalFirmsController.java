package com.Faciltiy_Tool.facilitytoos.Controller;


import com.Faciltiy_Tool.facilitytoos.Repository.ExternalFirmsRepository;
import com.Faciltiy_Tool.facilitytoos.config.AppProperties;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api")
public class ExternalFirmsController {


    private ExternalFirmsRepository externalFirmsRepository;
    private AppProperties appProperties;
    @Autowired
    public  ExternalFirmsController(ExternalFirmsRepository externalFirmsRepository, AppProperties appProperties) {
        this.externalFirmsRepository = externalFirmsRepository;
        this.appProperties = appProperties;
    }


    /**
     * function om nieuew external firm te creeren
     * @param externalFirms object met informatie over gewenst externalfirm, komt van de frontend.
     * @return als de external firm gecreerd is, reurneert https status ok, anders returneert dab request.
     */
    @PostMapping("/externalFirms")
    public ResponseEntity<ExternalFirms> addExternalFirm(@RequestBody ExternalFirms externalFirms) {
        externalFirmsRepository.save(externalFirms);
        return new ResponseEntity<>(HttpStatus.OK);

    }


    /**
     *
     * @return een lisjt van alle bestaande firms.
     */

    @GetMapping("/externalFirms")
    public List<ExternalFirms> getExternalFirms() {
        return externalFirmsRepository.findAll();
    }


    /**
     * verwijdert een external firm vanuit database.
     * @param id id van de firm die we willen verwijderen
     * @return External firm removed With id : met de id vam de firm.
     */
    @DeleteMapping("externalFirms/{id}")
    public String deleteExternalFirm(@PathVariable String id) {
        externalFirmsRepository.deleteById(id);
        return "External firm removed With id :" + id;
    }

    @GetMapping("/externalFirmToken/{id}")
    public String getIdToken(@PathVariable String id) {
        Optional<ExternalFirms> optionalExternalFirm = externalFirmsRepository.findById(id);
        ExternalFirms externalFirms;
        if (optionalExternalFirm.isPresent()) {
            externalFirms = optionalExternalFirm.get();
        } else {
            return null;
        }
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 7200000);
        return Jwts.builder()
                .setSubject(optionalExternalFirm.get().getId())
                .setIssuedAt(new Date())
                .claim("FirmId", optionalExternalFirm.get().getId())
                .claim("FirmName", optionalExternalFirm.get().getDisplayName())
                .claim("role", "externalFirm")
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    /**
     * Functie om een external firm in de mongo database op basis van de id op te halen
     */
    @GetMapping("/externalFirms/{id}")
    public Optional<ExternalFirms> getExternalFirmById(@PathVariable String id) {
        return externalFirmsRepository.findById(id);
    }

    /**
     * deze function wordt aangeroepen wanneer iemand een external firm wil updaten in de frontend
     * @param id
     * @param updateForm deze external firm wordt van de frontend als json file gestuurd
     * @returnHttpStatus.ok als de defect juist gecareerd anders return BAD_REQUEST
     */
    @PutMapping("/externalFirms/{id}")
    public ResponseEntity<ExternalFirms> updateExternalFirm(@PathVariable String id,@RequestBody ExternalFirms updateForm) {
        Optional<ExternalFirms> optionalExternalFirm = externalFirmsRepository.findById(id);
        ExternalFirms externalFirms;


        if (optionalExternalFirm.isPresent()) {
            externalFirms = optionalExternalFirm.get();
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {

           String email = updateForm.getEmail();
            String displayName = updateForm.getDisplayName();
            String telefonNr = updateForm.getTelefonNr();

            externalFirms.checkExternalFirms(email, displayName , telefonNr , externalFirms);


            // Push de wijzigingen naar de database
            externalFirmsRepository.save(externalFirms);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
