package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.FacilityController;
import com.Faciltiy_Tool.facilitytoos.Controller.OrderController;
import com.Faciltiy_Tool.facilitytoos.Repository.FacilityRepository;
import com.Faciltiy_Tool.facilitytoos.Repository.OrderRepository;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import com.Faciltiy_Tool.facilitytoos.model.Order;
import com.Faciltiy_Tool.facilitytoos.model.Report;
import com.Faciltiy_Tool.facilitytoos.model.User;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class OrderControllerTests {
    OrderRepository mockRepo = Mockito.mock(OrderRepository.class);
    OrderController controller = new OrderController(mockRepo);


    /**
     * Een test voor de saveOrder functie
     * expected HttpStatus.Ok
     *
     */
    @Test
    public void Save_Orders_To_Database_If_Succeeded_Return_HttpStatus_200() {

        User azureUser = new User("57ef89sdf12f3dd5def", "Mark");
        ExternalFirms firm = new ExternalFirms(null, null, null, null);
        Order order = new Order("123456", "Mark", "test title", "ELL", "1", "01.03",
                false, "test description", "2020-06-06", "10:00", "Logistieke diensten",
                "Drank", "Wachten op ontvangst door logistieke diensten", azureUser, firm
        );
        MockMultipartFile firstFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        Mockito.when(mockRepo.save(order)).thenReturn(order);

        Order actual = mockRepo.save(order);

        assertThat(actual).isEqualTo(order);
        assertThat(actual.getCategory()).isEqualTo("Drank");
        System.out.println("=======Save Order was Successful =======");
    }


    /**
     * Een test voor de getOrders function
     * returneert een lijst van Orders als de test geslaagt is
     */
    @Test
    public void Get_All_Orders_From_Database() {

        List<Order> orders = new ArrayList<>();
        Order order = new Order();
        order.setCampus("ELL");
        order.setTitle("title");
        order.setDescription("description");
        order.setLocation("03.12");
        order.setDate("2020-04-28");
        order.setTime("09:30");
        orders.add(order);

        Mockito.when(controller.getOrders()).thenReturn(orders);

        List<Order> actual = controller.getOrders();

        assertThat(actual.size()).isGreaterThan(0);

        System.out.println("=======Get all orders(tasks) was successful =======");
    }


    /**
     * Een test voor de getOrderById function
     * returneert een order op basis van id als de test geslaagt is
     */
    @Test
    public void Get_One_Order_By_Id() {

        Order order = new Order();
        order.setId("1");
        order.setCampus("ELL");
        order.setTitle("title");
        order.setDescription("description");
        order.setLocation("03.12");
        order.setDate("2020-04-28");
        order.setTime("09:30");

        Mockito.when(controller.getOrdersById(order.getId())).thenReturn(Optional.of(order));
        assertThat(controller.getOrdersById(order.getId())).isEqualTo(Optional.of(order));

        System.out.println("=======Get order by ID was successful  =======");
    }


    /**
     * Een test voor de getOrderByLocation function
     * returneert een order op basis van locatie als de test geslaagt is
     */
    @Test
    public void Get_Orders_By_Location() {

        List<Order> orders = new ArrayList<>();
        Order order = new Order();
        order.setId("1");
        order.setCampus("ELL");
        order.setTitle("title");
        order.setDescription("description");
        order.setLocation("03.12");
        order.setDate("2020-04-28");
        order.setTime("09:30");
        orders.add(order);

        Mockito.when(controller.getOrdersByLocation(order.getLocation())).thenReturn(orders);
        assertThat(controller.getOrdersByLocation(order.getLocation())).isEqualTo(orders);
    }


    /**
     * Een test voor de getOrderByCategory function
     * returneert een order op basis van categorie als de test geslaagt is
     */
    @Test
    public void Get_Order_By_Category() {
        List<Order> orders = new ArrayList<>();
        Order order = new Order();
        order.setId("1");
        order.setCampus("ELL");
        order.setTitle("title");
        order.setDescription("description");
        order.setLocation("03.12");
        order.setDate("2020-04-28");
        order.setTime("09:30");
        orders.add(order);

        Mockito.when(controller.getOrdersByCategory(order.getCategory())).thenReturn(orders);
        assertThat(controller.getOrdersByCategory(order.getCategory())).isEqualTo(orders);
    }


    @Test
    public void Find_By_Assign_To__Logged_In_User (){

        List<Order> orders = new ArrayList<>();
        Order order = new Order();
        order.setId("1");
        order.setCampus("ELL");
        order.setTitle("title");
        order.setDescription("description");
        order.setLocation("03.12");
        order.setDate("2020-04-28");
        order.setTime("09:30");
        User azureUser = new User("9876543","Mark");
        order.setAssignTo(azureUser);
        orders.add(order);
        Mockito.when(controller.getMyOrders(order.getAssignTo().getId())).thenReturn(orders);
        assertThat(controller.getMyOrders(order.getAssignTo().getId())).isEqualTo(orders);

        System.out.println("=======Find Orders By AssignTo Logged In User Succeded =======");


    }


}
