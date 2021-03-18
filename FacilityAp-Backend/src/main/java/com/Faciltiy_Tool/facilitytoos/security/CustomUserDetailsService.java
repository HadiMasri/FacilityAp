package com.Faciltiy_Tool.facilitytoos.security;

import com.Faciltiy_Tool.facilitytoos.Repository.ExternalFirmsRepository;
import com.Faciltiy_Tool.facilitytoos.Repository.UserRepository;

import com.Faciltiy_Tool.facilitytoos.exception.ResourceNotFoundException;
import com.Faciltiy_Tool.facilitytoos.model.ExternalFirms;
import com.Faciltiy_Tool.facilitytoos.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExternalFirmsRepository externalFirmsRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadExternalFirmById(String id) {
        ExternalFirms externalFirms = externalFirmsRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return ExternalFirmPrincipal.create(externalFirms);
    }
}

