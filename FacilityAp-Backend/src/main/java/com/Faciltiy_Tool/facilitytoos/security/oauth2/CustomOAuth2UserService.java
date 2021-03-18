package com.Faciltiy_Tool.facilitytoos.security.oauth2;


import com.Faciltiy_Tool.facilitytoos.Repository.UserRepository;
import com.Faciltiy_Tool.facilitytoos.exception.OAuth2AuthenticationProcessingException;
import com.Faciltiy_Tool.facilitytoos.model.AuthProvider;
import com.Faciltiy_Tool.facilitytoos.model.User;
import com.Faciltiy_Tool.facilitytoos.security.UserPrincipal;
import com.Faciltiy_Tool.facilitytoos.security.oauth2.user.OAuth2UserInfo;
import com.Faciltiy_Tool.facilitytoos.security.oauth2.user.OAuth2UserInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    public String accessToken =null;
    @Autowired
    private UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            user = updateExistingUser(user, oAuth2UserInfo,oAuth2UserRequest);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user);
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setRole(oAuth2UserInfo.getRole());
        user.setAccessToken(oAuth2UserRequest.getAccessToken().getTokenValue());
        user.setNotification(oAuth2UserInfo.getNotification());
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo,OAuth2UserRequest oAuth2UserRequest) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setAccessToken(oAuth2UserRequest.getAccessToken().getTokenValue());
        return userRepository.save(existingUser);
    }




}
