package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.OrderCommentController;

import com.Faciltiy_Tool.facilitytoos.Repository.OrderCommentRepository;

import com.Faciltiy_Tool.facilitytoos.model.OrderComment;
import com.Faciltiy_Tool.facilitytoos.model.OrderCommentData;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class OrderCommentControllerTest {
    OrderCommentRepository mockRepo = Mockito.mock(OrderCommentRepository.class);
    OrderCommentController controller = new OrderCommentController(mockRepo);

    /**
     * Save comment For a report
     * @throws IOException
     *
     */
    @Test
    public void Save_Comment_To_Order_Into_Database_If_Succeeded_return_New_OrderCommentDate() throws IOException {

        OrderCommentData orderCommentData = new OrderCommentData("kotiba","0123456789","test comment");
        List<OrderCommentData> orderCommentDataList = List.of(orderCommentData);

        OrderComment orderComment = new OrderComment("121212","5ec15918855b7259c79fc4ac", orderCommentDataList );


        Mockito.when(mockRepo.save(orderComment)).thenReturn(orderComment);

        OrderComment actual = controller.addComment(" 5ec15918855b7259c79fc4ac ",orderComment);

        assertThat(actual).isEqualTo(orderComment);

        System.out.println("=======Save Comment for a Order Succeded =======");
    }

    @Test
    public void GET_ALL_COMMENTS_FROM_Database_BY_ORDER_ID_If_Succeeded_return_New_OrderCommentDate() throws IOException {

        OrderCommentData orderCommentData = new OrderCommentData("kotiba","0123456789","test comment");
        List<OrderCommentData> orderCommentDataList = List.of(orderCommentData);

        OrderComment orderComment = new OrderComment("121212","5ec15918855b7259c79fc4ac", orderCommentDataList );


        Mockito.when(mockRepo.findOrderCommentByOrderId("5ec15918855b7259c79fc4ac")).thenReturn(orderComment);

        OrderComment actual = controller.comment("5ec15918855b7259c79fc4ac" );

        assertThat(actual).isEqualTo(orderComment);

        System.out.println("=======Get Comments form database Succeded =======");
    }
    @Test
    public void Update_Comment_Order_Into_Database_If_Succeeded_return_New_OrderCommentDate() throws IOException {

        OrderCommentData orderCommentData = new OrderCommentData("kotiba","0123456789","test comment");
        List<OrderCommentData> orderCommentDataList = List.of(orderCommentData);

        OrderComment orderComment = new OrderComment("121212","5ec15918855b7259c79fc4ac", orderCommentDataList );
        Mockito.when(mockRepo.findOrderCommentByOrderId("5ec15918855b7259c79fc4ac")).thenReturn(orderComment);

        List<OrderCommentData> orderCommentDataList1 = orderComment.getOrderCommentData();

        OrderCommentData data = orderCommentDataList1.get(0);
        data.setText("test update comment");



        OrderComment actual = controller.updateComment("5ec15918855b7259c79fc4ac",0,"test update comment");

        assertThat(actual.getOrderCommentData().get(0).getText()).isEqualTo(orderComment.getOrderCommentData().get(0).getText());

        System.out.println("=======Update Comments  Succeded =======");
    }
}
