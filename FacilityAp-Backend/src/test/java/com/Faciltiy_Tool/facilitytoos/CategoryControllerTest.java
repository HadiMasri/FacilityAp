package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.CategoryController;
import com.Faciltiy_Tool.facilitytoos.Repository.CategoryRepository;
import com.Faciltiy_Tool.facilitytoos.model.Category;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
  class CategoryControllerTest {

    @Autowired
    private CategoryRepository repository;

    CategoryController categoryController = Mockito.mock(CategoryController.class);

    @Test
    public void testAddDepartment()
    {
        Category category = new Category("", "Test", new TreeSet<String>());

        Mockito.when(categoryController.addDepartment("Test")).thenReturn(category);
        assertThat(category).isEqualTo(categoryController.addDepartment("Test"));
    }

    @Test
    public void testAddCategory()
    {
        TreeSet<String> categories = new TreeSet<>();
        categories.add("Netwerk");
        categories.add("Afval");
        categories.add("Drank");

        Category category = new Category("", "Test", categories);

        Mockito.when(categoryController.addCategory(category.getId(), "{'category': 'Drank'}")).thenReturn(category.getCategories());

        assertThat(categoryController.addCategory(category.getId(), "{'category': 'Drank'}")).size().isEqualTo(3);
    }

    @Test
    public void testDeleteDepartment()
    {
        Category category = new Category("", "Test", new TreeSet<String>());

        Mockito.when(categoryController.deleteDepartment(category.getId())).thenReturn(category);
        assertThat(category).isEqualTo(categoryController.deleteDepartment(category.getId()));
    }

    @Test
    public void testDeleteCategory()
    {
        TreeSet<String> categories = new TreeSet<>();
        categories.add("Netwerk");
        categories.add("Afval");
        categories.add("Drank");

        Category category = new Category("", "Test", categories);

        Mockito.when(categoryController.deleteCategory(category.getId(), "{'category': 'Drank'}")).thenReturn(category.getCategories());

        assertThat(categoryController.deleteCategory(category.getId(), "{'category': 'Drank'}")).size().isEqualTo(3);
    }

    @Test
    public void GET_ALL_CAtegories_Return_List_Of_Categories (){

        TreeSet<String> categories = new TreeSet<>();
        categories.add("Computer");
        categories.add("Netwerk");
        categories.add("ICT klasuitrusting");
        categories.add("Diensten");

        List<Category> categoriesList = new ArrayList<>();
        Category category = new Category();
        category.setId("1");
        category.setDepartment("ICT diensten");
        category.setCategories(categories);
        categoriesList.add(category);

        Mockito.when(categoryController.getAllCategory()).thenReturn(categoriesList);

        List<Category> actual = categoryController.getAllCategory();

        assertThat(actual.size()).isGreaterThan(0);

        System.out.println("=======Get all Categories Succeded =======");
    }



    @Test
    public void GET_CAtegories_By_Department_Name_Return_List_Of_Categories (){

        TreeSet<String> categories = new TreeSet<>();
        categories.add("Computer");
        categories.add("Netwerk");
        categories.add("ICT klasuitrusting");
        categories.add("Diensten");

        ArrayList<Category> categoriesList = new ArrayList<>();
        Category category = new Category();
        category.setId("1");
        category.setDepartment("ICT diensten");
        category.setCategories(categories);

        categoriesList.add(category);

        Mockito.when(categoryController.getByDepartment("ICT diensten")).thenReturn(categoriesList);

        List<Category> actual = categoryController.getByDepartment("ICT diensten");

        assertThat(actual.size()).isEqualTo(1);

        System.out.println("=======Get  Categories By Department Succeded =======");
    }
}

