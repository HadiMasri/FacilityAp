package com.Faciltiy_Tool.facilitytoos;


import com.Faciltiy_Tool.facilitytoos.Controller.ExternalFirmsController;
import com.Faciltiy_Tool.facilitytoos.Repository.ExternalFirmsRepository;
import com.Faciltiy_Tool.facilitytoos.model.Emergency;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class ExternalFirmsTests {
    @Autowired
    ExternalFirmsRepository repository;

    ExternalFirmsController controller = Mockito.mock(ExternalFirmsController.class);

    @Test
    public void Get_All_External_Firms() {
        List<ExternalFirms> externalFirms = new ArrayList<>();
        ExternalFirms Firm = new ExternalFirms();
        Firm.setDisplayName("External Firm Test");
        Firm.setEmail("ExternalFirm@test.be");
        Firm.setTelefonNr("01234567");


        externalFirms.add(Firm);

        Mockito.when(controller.getExternalFirms()).thenReturn(externalFirms);

        List<ExternalFirms> actual = controller.getExternalFirms();

        assertThat(actual.size()).isGreaterThan(0);

        System.out.println("=======Get all External Firms was successful =======");
    }

    @Test
    public void Get_One_External_Firm_By_Id() {

        ExternalFirms externalFirms = new ExternalFirms();
        externalFirms.setDisplayName("External Firm Test");
        externalFirms.setEmail("ExternalFirm@test.be");
        externalFirms.setTelefonNr("01234567");

        Mockito.when(controller.getExternalFirmById(externalFirms.getId())).thenReturn(Optional.of(externalFirms));
        assertThat(controller.getExternalFirmById(externalFirms.getId())).isEqualTo(Optional.of(externalFirms));

        System.out.println("=======Get External FIrm by ID was successful  =======");
    }

    @Test
    public void Delete_One_External_Firm_By_Id() {

        List<ExternalFirms> externalFirms = new ArrayList<>();
        ExternalFirms Firm = new ExternalFirms();
        Firm.setDisplayName("External Firm Test");
        Firm.setEmail("ExternalFirm@test.be");
        Firm.setTelefonNr("01234567");


        externalFirms.add(Firm);

        controller.deleteExternalFirm(Firm.getId());

        List<ExternalFirms> actual = controller.getExternalFirms();

        assertThat(actual.size()).isEqualTo(0);

        System.out.println("=======Delete External Firm by ID was successful  =======");
    }
}
