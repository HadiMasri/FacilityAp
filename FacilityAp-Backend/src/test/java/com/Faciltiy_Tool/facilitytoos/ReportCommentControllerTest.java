package com.Faciltiy_Tool.facilitytoos;
import com.Faciltiy_Tool.facilitytoos.Controller.ReportCommentController;
import com.Faciltiy_Tool.facilitytoos.Repository.ReportCommentRepository;
import com.Faciltiy_Tool.facilitytoos.model.ReportComment;
import com.Faciltiy_Tool.facilitytoos.model.ReportCommentData;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
 class ReportCommentControllerTest {

    ReportCommentRepository mockRepo = Mockito.mock(ReportCommentRepository.class);
    ReportCommentController controller = new ReportCommentController(mockRepo);

    /**
     * Save comment For a report
     * @throws IOException
     *
     */
    @Test
    public void Save_Comment_Fro_Report_Into_Database_If_Succeeded_return_New_CommentObject() throws IOException {

        ReportCommentData reportCommentData = new ReportCommentData("kotiba","0123456789","test comment");
       List<ReportCommentData> reportCommentDataList = List.of(reportCommentData);

        ReportComment reportComment = new ReportComment("121212","5ec15918855b7259c79fc4ac", reportCommentDataList );


        Mockito.when(mockRepo.save(reportComment)).thenReturn(reportComment);

        ReportComment actual = controller.addComment(" 5ec15918855b7259c79fc4ac ",reportComment);

        assertThat(actual).isEqualTo(reportComment);

        System.out.println("=======Save Comment for a Report Succeded =======");
    }

    @Test
    public void GET_ALL_COMMENTS_FROM_Database_BY_REPORT_ID_If_Succeeded_return_New_CommentObject() throws IOException {

        ReportCommentData reportCommentData = new ReportCommentData("kotiba","0123456789","test comment");
        List<ReportCommentData> reportCommentDataList = List.of(reportCommentData);

        ReportComment reportComment = new ReportComment("121212","5ec15918855b7259c79fc4ac", reportCommentDataList );


        Mockito.when(mockRepo.findCommentByReportId("5ec15918855b7259c79fc4ac")).thenReturn(reportComment);

        ReportComment actual = controller.comment("5ec15918855b7259c79fc4ac" );

        assertThat(actual).isEqualTo(reportComment);

        System.out.println("=======Get Comments form database Succeded =======");
    }
    @Test
    public void Update_Comment_Fro_Report_Into_Database_If_Succeeded_return_New_CommentObject() throws IOException {

        ReportCommentData reportCommentData = new ReportCommentData("kotiba","0123456789","test comment");
        List<ReportCommentData> reportCommentDataList = List.of(reportCommentData);
        ReportComment reportComment = new ReportComment("121212","5ec15918855b7259c79fc4ac", reportCommentDataList );
        Mockito.when(mockRepo.findCommentByReportId("5ec15918855b7259c79fc4ac")).thenReturn(reportComment);

        List<ReportCommentData> reportCommentData2 = reportComment.getReportCommentData();

        ReportCommentData data = reportCommentData2.get(0);
        data.setText("test update comment");



        ReportComment actual = controller.updateComment("5ec15918855b7259c79fc4ac",0,"test update comment");

        assertThat(actual.getReportCommentData().get(0).getText()).isEqualTo(reportComment.getReportCommentData().get(0).getText());

        System.out.println("=======Update Comments  Succeded =======");
    }
}
