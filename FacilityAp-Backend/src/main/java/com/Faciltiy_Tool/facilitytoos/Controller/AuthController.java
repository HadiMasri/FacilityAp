package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.Repository.UserRepository;
import com.Faciltiy_Tool.facilitytoos.exception.ResourceNotFoundException;
import com.Faciltiy_Tool.facilitytoos.model.User;
import com.Faciltiy_Tool.facilitytoos.security.CurrentUser;
import com.Faciltiy_Tool.facilitytoos.security.UserPrincipal;
import com.Faciltiy_Tool.facilitytoos.security.oauth2.CustomOAuth2UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.GET;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api")
public class AuthController {

    @Autowired
    private ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    private UserRepository userRepository;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
public AuthController(RestTemplateBuilder restTemplateBuilder, UserRepository userRepository) {
    this.restTemplate = restTemplateBuilder.build();
    this.userRepository = userRepository;
}


    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }



    @PutMapping("/role/{id}")
    public User updateRole(@PathVariable String id, @RequestBody User updateForm) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user;


        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            userRepository.save(updateForm);
            return updateForm;
        }
        try {
            String role = updateForm.getRole();
            // Indien een attribuut verschilt met het origineel object, update de attribuut
            if (!role.equals(user.getRole())) {
                user.setRole(role);
            }
            // Push de wijzigingen naar de database
            userRepository.save(user);
            return user;
        } catch (Exception ex) {
            return user;
        }
    }

  @GetMapping("/user")
  public Object getAzureUsers(@CurrentUser UserPrincipal userPrincipal)  {
      String accessToken = userPrincipal.getAccessToken();
      //accessToken = customOAuth2UserService.accessToken;
      String url = "https://graph.microsoft.com/v1.0/users";

      // create headers
      HttpHeaders headers = new HttpHeaders();
      // set custom header
      headers.set("Authorization", "Bearer " + accessToken);
      // build the request
      HttpEntity request = new HttpEntity(headers);

      // use `exchange` method for HTTP call
      ResponseEntity<Object> response = this.restTemplate.exchange(url, HttpMethod.GET, request, Object.class, 1);
      if(response.getStatusCode() == HttpStatus.OK) {
          return response.getBody();
      } else {
          return null;
      }
    }


    /**
     * dit function verwijdert de role die al bestaat, en geeft Medewerker role als defualt
     * @param id het user id
     * @return user object met de geupdated role
     */
    @PutMapping("/role-delete/{id}")
    public User removeRole(@PathVariable String id ) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user;

        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            return null;
        }
        try {

                user.setRole("Medewerker");

            // Push de wijzigingen naar de database
            userRepository.save(user);
            return user;
        } catch (Exception ex) {
            return null;
        }
    }

    @PutMapping("/userNotification/{id}")
    public ResponseEntity<?> updateNotification(@PathVariable String id,@RequestBody String body) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user;


        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            return null;
        }
        try {
            User notification = objectMapper.readValue(body, User.class);
            // Indien een attribuut verschilt met het origineel object, update de attribuut
            if (!notification.getNotification().equals(user.getNotification())) {
                user.setNotification(notification.getNotification());
            }
            // Push de wijzigingen naar de database
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
