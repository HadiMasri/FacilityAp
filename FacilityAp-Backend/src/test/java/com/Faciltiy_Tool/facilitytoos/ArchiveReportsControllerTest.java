package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.ArchiveReportController;
import com.Faciltiy_Tool.facilitytoos.Repository.ArchiveReportsRepository;
import com.Faciltiy_Tool.facilitytoos.model.ArchiveReports;
import com.Faciltiy_Tool.facilitytoos.model.User;
import com.sun.mail.imap.protocol.UIDSet;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
 class ArchiveReportsControllerTest {

    ArchiveReportsRepository mockRepo  = Mockito.mock(ArchiveReportsRepository.class);
    ArchiveReportController controller  = new ArchiveReportController(mockRepo);

    @Test
    public void Add_repot_To_Archive_If_Succeeded_Return_HttpStatus_200() {

        User azureUser = new User("1212","kotiba");

        ArchiveReports archiveReports = new ArchiveReports("1212", "kotiba", "test title", "test description", "01.02", false,
                "ELL", "OPEN", "Wachten op ontvangst door logistieke diensten", "High", "ICT diensten", "Computer", azureUser
        );
        Mockito.when(mockRepo.save(archiveReports)).thenReturn(archiveReports);

        ArchiveReports actual = controller.addReportToArchive(archiveReports);

        assertThat(actual).isEqualTo(archiveReports);
        assertThat(actual.getReporterId()).isEqualTo("1212");
        System.out.println("=======Save reports in the archive Succeeded =======");
    }

     @Test
    public void GET_List_Of_repots_From_Archive_If_Succeeded_Return_List_Of_Reports() {

        User azureUser = new User("1212","kotiba");
         ArchiveReports archiveReports = new ArchiveReports("1212", "kotiba", "test title", "test description", "01.02", false,
                 "ELL", "OPEN", "Wachten op ontvangst door logistieke diensten", "High", "ICT diensten", "Computer", azureUser
         );
        User azureUser2 = new User("1212","kotiba");
        ArchiveReports archiveReports2 = new ArchiveReports("1212","kotiba","test title","test description","01.02", false,
                "ELL","OPEN","High","ICT diensten","Computer",null,azureUser
        );

        List<ArchiveReports> archiveReportsList = List.of(archiveReports,archiveReports2);
      

        Mockito.when(mockRepo.findAll()).thenReturn(archiveReportsList);

        List<ArchiveReports> actual = controller.getAllReportsFromArchive();



        assertThat(actual.size()).isEqualTo(2);
        assertThat(actual).isEqualTo(archiveReportsList);
        System.out.println("=======Get reports From the archive Succeeded =======");
    }
}
