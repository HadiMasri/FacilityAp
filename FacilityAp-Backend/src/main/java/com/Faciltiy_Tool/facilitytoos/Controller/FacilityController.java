package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.Repository.FacilityRepository;
import com.Faciltiy_Tool.facilitytoos.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/api")
public class FacilityController {

    private final FacilityRepository repository;
    @Autowired
    public FacilityController(FacilityRepository repository) {
        this.repository = repository;
    }
    @Autowired
    private ObjectMapper objectMapper;
    /**
     * Functie om alle reports in de mongo database op te halen
     */
    @GetMapping("/report")
    public List<Report> getAllReports() {
        return repository.findAllByOrderByUpVoteDesc();
    }



    /**
     * dit function word gebruikt om employee toewijzen aan een report
     *
     * @param body dit komt van de frontend als json met reporterId aen reportId en employee username en id waartoe willen we het het report toewijzen
     * @return HttpStatus.ok als de de report toegewijzen is aan employee, anders gaat HttpStatus.BAD_REQUEST returneren.
     */
    @PostMapping("/assign-report")
    public Report assignReportToEmployee(@RequestBody AssignReport body) {
        try {

            Report report = repository.findOneById(body.getReportId());
            report.setReporterId(body.getReporterId());
            User user = new User(body.getAssignTo().getId(), body.getAssignTo().getName());
            report.setAssignTo(user);
            repository.save(report);
            return report;

        } catch (Exception e) {
            return null;
        }


    }

    /**
     * deze function wordt gebruikt wanneer iemand op create defect button klikt in de frontend
     *
     * @param image      eerste parameters is een image van het type MultipartFile
     * @param reportForm deze report wordt van de frontend als json file gestuurd
     * @return HttpStatus.ok als de defect juist gecareerd anders return BAD_REQUEST
     */
    @PostMapping("/report")
    public  Report saveReport(@RequestParam(value = "image", required = false) MultipartFile image,
                              @RequestParam(value = "report") String reportForm) {

        try {
            User azureUser = new User(null, null);
            ExternalFirms firm = new ExternalFirms(null, null, null, null);
            Report dto = objectMapper.readValue(reportForm, Report.class);
            dto.setAssignTo(azureUser);
            dto.setAssignToFirm(firm);


            if (image != null) {
                Report reportAd1 = new Report(dto.getReporterId(), dto.getReporterName(),dto.getTitle(), dto.getDescription(), dto.getLocation(), dto.isCloseTo(), dto.getCampus(),dto.getFloor(),
                        dto.getStatus(), dto.getPriority(),dto.getCategoryDepartment(), dto.getCategory(), image.getBytes(), dto.getAssignTo(), dto.getAssignToFirm());
                repository.save(reportAd1);
                return  reportAd1;
            } else {

                Report reportAd1 = new Report(dto.getReporterId(), dto.getReporterName(),dto.getTitle(), dto.getDescription(), dto.getLocation(), dto.isCloseTo(), dto.getCampus(),dto.getFloor(),
                        dto.getStatus(), dto.getPriority(),dto.getCategoryDepartment(), dto.getCategory(),  dto.getAssignTo(), dto.getAssignToFirm());
                repository.save(reportAd1);
                return  reportAd1;
            }
        } catch (Exception e) {

            return null;
        }

    }

    /**
     * Functie om een report in de mongo database op basis van het id op te halen
     */
    @GetMapping("/report/{id}")
    public Optional<Report> getReportsById(@PathVariable String id) {
        return repository.findById(id);
    }

    /**
     * Functie om een report in de mongo database op basis van het id te verwijderen
     */
    @DeleteMapping("/report/{id}")
    public Boolean deleteReport(@PathVariable String id) {
        if(id == null){
            return false;
        } else {
            repository.deleteById(id);
            return true;
        }

    }


    /**
     * Functie om een report in de mongo database op basis van de reportedId op te halen
     */
    @GetMapping("/report-reportedBy/{reporterId}")
    public List<Report> getByReporterId(@PathVariable String reporterId) {
        return repository.findByReporterId(reporterId);
    }

    /**
     * Functie om een report die toegewijzen aan de ingelogde gebruker (volgens zijn role)
     */
    @GetMapping("/my-report/{userId}")
    public List<Report> myReports(@PathVariable String userId) {
        return repository.getAllByAssignToId(userId);
    }


    @GetMapping("/report-bySubscriberId/{userId}")
    public List<Report> getAllBySubscribersContains(@PathVariable String userId) {
        return repository.getAllBySubscribersContains(userId);
    }


    @PutMapping("/report/{id}")
    public Report updateReport(@PathVariable String id, @RequestParam(value = "image", required = false) MultipartFile image, @RequestParam(value = "report") String reportForm)
    {
        Optional<Report> optionalReport = repository.findById(id);
        Report report;

        // Controleren of een report met de opgegeven id bestaat
        if (optionalReport.isPresent()) {
            report = optionalReport.get();
        } else {
            return null;
        }

        try {

            Report dto = objectMapper.readValue(reportForm, Report.class);

            // Indien een attribuut verschilt met het origineel object, update de attribuut
            if (!dto.getTitle().equals(report.getTitle())) {
                report.setTitle(dto.getTitle());
            }
            if (!dto.getDescription().equals(report.getDescription())) {
                report.setDescription(dto.getDescription());
            }
            if (!dto.getCampus().equals(report.getCampus())) {
                report.setCampus(dto.getCampus());
            }
            if (!dto.getLocation().equals(report.getLocation())) {
                report.setLocation(dto.getLocation());
            }
            if (dto.isCloseTo() != report.isCloseTo()) {
                report.setCloseTo(!report.isCloseTo());
            }
            if (!dto.getFloor().equals(report.getFloor())) {
                report.setFloor(dto.getFloor());
            }
            if (!dto.getCategory().equals(report.getCategory())) {
                report.setCategory(dto.getCategory());
            }
            if (!dto.getCategoryDepartment().equals(report.getCategoryDepartment())) {
                report.setCategoryDepartment(dto.getCategoryDepartment());
            }
            if (!dto.getPriority().equals(report.getPriority())) {
                report.setPriority(dto.getPriority());
            }
            if (!dto.getStatus().equals(report.getStatus())) {
                report.setStatus(dto.getStatus());
                report.getStatusHistory().add(dto.getStatus());
            }
            if (image != null) {
                report.setBytes(image.getBytes());
            }

            // Push de wijzigingen naar de database
            repository.save(report);

            return report;
        } catch (Exception ex) {
            return null;
        }
    }

    /**
     *
     * Functie om te kunnen abonneren op een report
     */
    @PutMapping("/subscribe")
    public ResponseEntity<UpVote> addUpVoter(@RequestBody @Valid UpVote body) {

        try {

            String userId = body.getUserId();
            Report report = repository.findOneById(body.getReport().getId());
            report.addSubscriber(userId);
            report.setUpVote();

            if (body.getUserId() == null || body.getReport() == null){
                return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
            } else {
                repository.save(report);
                return new ResponseEntity<>(HttpStatus.OK);
            }


        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    @PutMapping("/unsubscribe")
    public ResponseEntity<UpVote> unsubscribe(@RequestBody UpVote body) {

        try {
            String userId = body.getUserId();
            Report report = repository.findOneById(body.getReport().getId());
            report.addSubscriber(userId);
            report.removeSubscriber(userId);
            report.setUpVote();
            repository.save(report);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    /**
     * dit function word gebruikt om employee toewijzen aan een report
     *
     * @param body dit komt van de frontend als json met reporterId aen reportId en employee username en id waartoe willen we het het report toewijzen
     * @return HttpStatus.ok als de de report toegewijzen is aan employee, anders gaat HttpStatus.BAD_REQUEST returneren.
     */
    @PostMapping("/assignFirm-report")
    public Report assignReportToFirm(@RequestBody AssignReport body) {
        try {
            Report report = repository.findOneById(body.getReportId());
            report.setReporterId(body.getReporterId());
            ExternalFirms firm = new ExternalFirms(body.getAssignToFirm().getEmail(), body.getAssignToFirm().getDisplayName(), body.getAssignToFirm().getTelefonNr(), null);
            report.setAssignToFirm(firm);
            repository.save(report);
            return report;
        } catch (Exception e) {
            return null;
        }

    }


}
