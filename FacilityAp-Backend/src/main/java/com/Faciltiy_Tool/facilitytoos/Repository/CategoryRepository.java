package com.Faciltiy_Tool.facilitytoos.Repository;

import com.Faciltiy_Tool.facilitytoos.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface CategoryRepository extends MongoRepository<Category, String> {
    ArrayList<Category> findByDepartment(String department);
}
