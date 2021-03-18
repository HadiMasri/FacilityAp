package com.Faciltiy_Tool.facilitytoos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.SortedSet;
import java.util.TreeSet;

@Document(collection = "categories")
public class Category {
    @Id
    private String id;
    private String department;
    private TreeSet<String> categories;

    public Category(String id, String department, TreeSet<String> categories) {
        this.id = id;
        this.department = department;
        this.categories = categories;
    }

    public Category() { }

    public TreeSet<String> getCategories() {
        return categories;
    }

    public void setCategories(TreeSet<String> categories) {
        this.categories = categories;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
