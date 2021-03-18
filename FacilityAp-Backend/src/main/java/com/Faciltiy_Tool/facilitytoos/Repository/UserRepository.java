package com.Faciltiy_Tool.facilitytoos.Repository;


import com.Faciltiy_Tool.facilitytoos.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}
