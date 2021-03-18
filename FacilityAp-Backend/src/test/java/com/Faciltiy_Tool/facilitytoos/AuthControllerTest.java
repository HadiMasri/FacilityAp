package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.AuthController;
import com.Faciltiy_Tool.facilitytoos.Controller.ExternalFirmsController;
import com.Faciltiy_Tool.facilitytoos.Repository.ExternalFirmsRepository;
import com.Faciltiy_Tool.facilitytoos.Repository.UserRepository;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import com.Faciltiy_Tool.facilitytoos.model.User;
import com.Faciltiy_Tool.facilitytoos.security.CurrentUser;
import com.Faciltiy_Tool.facilitytoos.security.UserPrincipal;
import com.Faciltiy_Tool.facilitytoos.security.oauth2.CustomOAuth2UserService;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class AuthControllerTest {

private UserPrincipal userPrincipal = new UserPrincipal(
        "5eceda6303560f3270ed948f",
        null,
        null,
        null,
        null,
        null
);


    @Test
    public void Get_Current_User_Returns_User_Object() {
        //Arrange
        UserRepository mockUserRepository = Mockito.mock((UserRepository.class));
        RestTemplateBuilder mockRestTemplateBuilder = Mockito.mock(RestTemplateBuilder.class);
        String  expectedId = "5eceda6303560f3270ed948f";
        User expectedUser = new User(expectedId);
        AuthController authController = new AuthController(mockRestTemplateBuilder, mockUserRepository);
        Mockito.when(mockUserRepository.findById(expectedId)).thenReturn(Optional.of(expectedUser));
        //Act
        User result = authController.getCurrentUser(userPrincipal);
        //Assert
        Mockito.verify(mockUserRepository).findById(expectedId);
        assertThat(result).isEqualTo(expectedUser);
    }

    @Test
    public void Get_All_Users_Returns_List_Of_All_Users() {
        //Arrange
        UserRepository mockUserRepository = Mockito.mock((UserRepository.class));
        RestTemplateBuilder mockRestTemplateBuilder = Mockito.mock(RestTemplateBuilder.class);
        AuthController authController = new AuthController(mockRestTemplateBuilder, mockUserRepository);
        User mockUsers = new User(
                "5eceda6303560f3270ed948f",
                "Masri Abdulhadi [student]",
                "abdulhadi.masri@student.ap.be",
                "Admin",
                null,
                null

        );
        List<User> userList = List.of(mockUsers);
        Mockito.when(mockUserRepository.findAll()).thenReturn(userList);
        //Act
        List<User> result = authController.getAllUsers();
        //Assert
        Mockito.verify(mockUserRepository).findAll();
        assertThat(result).isEqualTo(userList);
    }

    @Test
    public void Update_Role_Returns_User_With_Updated_Role() {
        //Arrange
        UserRepository mockUserRepository = Mockito.mock((UserRepository.class));
        RestTemplateBuilder mockRestTemplateBuilder = Mockito.mock(RestTemplateBuilder.class);
        AuthController authController = new AuthController(mockRestTemplateBuilder, mockUserRepository);
        User mockUser = new User(
                "5eceda6303560f3270ed948f",
                "Masri Abdulhadi [student]",
                "Admin",
                "abdulhadi.masri@student.ap.be ",
                null,
                null
        );
        String expectedId = "5eceda6303560f3270ed948f";
        mockUser.setRole("FacilitaireCoordinator");
        Mockito.when(mockUserRepository.findById(expectedId)).thenReturn(Optional.of(mockUser));
        //Act
        User result = authController.updateRole(expectedId, mockUser);
        //Assert
        Mockito.verify(mockUserRepository).findById(expectedId);
        assertThat(result.getRole()).isEqualTo("FacilitaireCoordinator");
    }

    @Test
    public void Update_Role_Returns_User_With_Medewerker_Role() {
        //Arrange
        UserRepository mockUserRepository = Mockito.mock((UserRepository.class));
        RestTemplateBuilder mockRestTemplateBuilder = Mockito.mock(RestTemplateBuilder.class);
        AuthController authController = new AuthController(mockRestTemplateBuilder, mockUserRepository);
        User mockUser = new User(
                "5eceda6303560f3270ed948f",
                "Masri Abdulhadi [student]",
                "Admin",
                "abdulhadi.masri@student.ap.be ",
                null,
                null
        );
        String expectedId = "5eceda6303560f3270ed948f";
        mockUser.setRole("Medewerker");
        Mockito.when(mockUserRepository.findById(expectedId)).thenReturn(Optional.of(mockUser));
        //Act
        User result = authController.removeRole(expectedId);
        //Assert
        Mockito.verify(mockUserRepository).findById(expectedId);
        assertThat(result.getRole()).isEqualTo("Medewerker");
    }
}



