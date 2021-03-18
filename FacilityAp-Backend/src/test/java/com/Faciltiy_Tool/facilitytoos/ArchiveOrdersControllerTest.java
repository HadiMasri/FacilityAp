package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.ArchiveOrderController;
import com.Faciltiy_Tool.facilitytoos.Repository.ArchiveOrdersRepository;
import com.Faciltiy_Tool.facilitytoos.model.ArchiveOrders;
import com.Faciltiy_Tool.facilitytoos.model.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

 class ArchiveOrdersControllerTest {


     ArchiveOrdersRepository mockRepo  = Mockito.mock(ArchiveOrdersRepository.class);
     ArchiveOrderController controller  = new ArchiveOrderController(mockRepo);

    @Test
    public void Add_Order_To_Archive_If_Succeeded_Return_HttpStatus_200() {

        User azureUser = new User("1212","kotiba");
        ArchiveOrders archiveOrders = new ArchiveOrders("136","kotiba","test order kotiba","NOO","01.35", false, "test description","2020-05-07",
                "11:11","Logistieke diensten",
                "Reinigen",
                "Wachten op ontvangst door logistieke diensten",
                azureUser);


        Mockito.when(mockRepo.save(archiveOrders)).thenReturn(archiveOrders);

        ArchiveOrders actual = controller.addOrderToArchive(archiveOrders);

        assertThat(actual).isEqualTo(archiveOrders);
        assertThat(actual.getCampus()).isEqualTo("NOO");
        System.out.println("=======Save Order in the archive Succeeded =======");
    }

    @Test
    public void GET_List_Of_repots_From_Archive_If_Succeeded_Return_List_Of_Reports() {

        User azureUser = new User("1212","kotiba");
        ArchiveOrders archiveOrders = new ArchiveOrders("136","kotiba","test order kotiba","NOO","01.35", false, "test description","2020-05-07",
                "11:11","Logistieke diensten",
                "Reinigen",
                "Wachten op ontvangst door logistieke diensten",
                azureUser);
        User azureUser1 = new User("245242","Hadi");
        ArchiveOrders archiveOrders1 = new ArchiveOrders("136","kotiba","test order kotiba","NOO","01.35", false, "test description","2020-05-07",
                "11:11","Logistieke diensten",
                "Reinigen",
                "Wachten op ontvangst door logistieke diensten",
                azureUser);
        List<ArchiveOrders> archiveOrdersList = List.of(archiveOrders,archiveOrders1);



        Mockito.when(mockRepo.findAll()).thenReturn(archiveOrdersList);

        List<ArchiveOrders> actual = controller.getAllOrdersFromArchive();

        assertThat(actual.size()).isEqualTo(2);

        Assert.assertEquals(actual, archiveOrdersList);
        System.out.println("=======Get Orders From the archive Succeeded =======");
    }
}
