package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.Repository.ArchiveReportsRepository;
import com.Faciltiy_Tool.facilitytoos.model.ArchiveReports;
import com.Faciltiy_Tool.facilitytoos.model.UpVote;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ArchiveReportController {

    private final ArchiveReportsRepository archiveReportsRepository;
    public ArchiveReportController(ArchiveReportsRepository archiveReportsRepository) {
        this.archiveReportsRepository = archiveReportsRepository;
    }




    /**
     *
     * @param reportToarchive object van ArchiveReport
     * @return Http status ok als het geslaagd anders returneert Bad request
     */
    @PostMapping("/report_archive")
    public ArchiveReports addReportToArchive(@RequestBody  ArchiveReports reportToarchive){
        try {
          archiveReportsRepository.save(reportToarchive);
            return reportToarchive;
        } catch (Exception ex){
            return  null;
        }

    }

    /**
     *
     * @return lijst van defecten van ArchiveReports collection
     */
    @GetMapping("/report_archive")
    public List<ArchiveReports> getAllReportsFromArchive(){
        return archiveReportsRepository.findAll();
    }

    /**
     *
     * @return lijst van geabonneerde op een bepaalde defect
     */
    @GetMapping("/report_archive/{userId}")
    public List<ArchiveReports> getAllBySubscribersContains(@PathVariable String userId) {
        return archiveReportsRepository.getAllBySubscribersContains(userId);
    }
    /**
     *
     * Notificatie weghalen
     */
    @PutMapping("/report_archive")
    public ResponseEntity<UpVote> removeNotification(@RequestBody UpVote body) {

        try {
            String userId = body.getUserId();
            ArchiveReports report = archiveReportsRepository.findOneById(body.getReport().getId());
            report.removeSubscriber(userId);
            archiveReportsRepository.save(report);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }
}