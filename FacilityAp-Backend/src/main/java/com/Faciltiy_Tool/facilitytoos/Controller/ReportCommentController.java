package com.Faciltiy_Tool.facilitytoos.Controller;
import com.Faciltiy_Tool.facilitytoos.Repository.ReportCommentRepository;
import com.Faciltiy_Tool.facilitytoos.model.ReportComment;
import com.Faciltiy_Tool.facilitytoos.model.ReportCommentData;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ReportCommentController {
    private ReportCommentRepository repository;

    public ReportCommentController(ReportCommentRepository repository) {
        this.repository = repository;
    }

    /**
     *
     * @param reportId van de selected report
     * @param comment object van comment with the niewe comment
     * @return new Comment object
     */

    @PostMapping("/comment/{reportId}")
    public ReportComment addComment(@PathVariable String reportId, @RequestBody ReportComment comment){
         ReportComment comment1 = repository.findCommentByReportId(reportId);
            if(comment1 == null){

                return repository.save(comment);
            } else {
                List<ReportCommentData> reportCommentData = comment1.getReportCommentData();
                List<ReportCommentData> commentFromclient = comment.getReportCommentData();
                reportCommentData.add(commentFromclient.get(commentFromclient.size() - 1));
                return repository.save(comment1);
            }

    }

    /**
     *
     * @param reportId
     * @return ReportComment object met een lijst vand alle commentaaren
     */


    @GetMapping("/comment/{reportId}")
    public ReportComment comment(@PathVariable("reportId") String reportId){
         return repository.findCommentByReportId(reportId);

    }

    /**
     *
     * @param reportId id van de report
     * @param index index van de commentaar in de CommentData Array
     * @param text new Commentaar message
     * @return new Commentaar
     */


    @PatchMapping("/comment/{reportId}/{index}")
    public ReportComment updateComment(@PathVariable String reportId, @PathVariable  int index , String text){
        ReportComment comment1 = repository.findCommentByReportId(reportId);

            List<ReportCommentData> reportCommentData = comment1.getReportCommentData();

            ReportCommentData data = reportCommentData.get(index);
             data.setText(text);
             repository.save(comment1);
            return comment1;

    }

    /**
     *  verwijder Comment van de Comments Array
     * @param reportId
     * @param index geselecteerde index om te verwijderen
     *
     */

    @DeleteMapping("/comment/{reportId}/{index}")
    public ReportComment deleteComment(@PathVariable String reportId, @PathVariable  int index ){
        ReportComment comment1 = repository.findCommentByReportId(reportId);

        List<ReportCommentData> reportCommentData = comment1.getReportCommentData();
            reportCommentData.remove(index);

        return repository.save(comment1);


    }
}
