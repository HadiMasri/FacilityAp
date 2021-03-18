package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.Repository.CategoryRepository;
import com.Faciltiy_Tool.facilitytoos.model.Category;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/api")
public class CategoryController
{
    private final CategoryRepository repository;
    @Autowired
    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    /**
     *
     * @param id van de Category
     * @param body JSON object met een veld voor de toe te voegen categorie.
     * @return Returneert of het toevoegen gelukt is of niet.
     */
    @PostMapping("/category/{id}")
    public Set<String> addCategory(@PathVariable String id, @RequestBody String body)
    {
        Set<String> emptyList = null;
        Optional<Category> optCategory = repository.findById(id);
        Category category;

        if (optCategory.isPresent())
        {
            category = optCategory.get();

            try
            {
                JSONObject obj = new JSONObject(body);
                String newCategory = obj.getString("category");

                category.getCategories().add(newCategory);
                repository.save(category);

                return category.getCategories();
            }
            catch (JSONException ex)
            {
                return emptyList;
            }
        }

        return emptyList;
    }

    /**
     *
     * @param id van de departement
     * @param body JSON object met een veld voor de te verwijderen categorie.
     * @return Returneert of het verwijderen gelukt is of niet.
     */
    @DeleteMapping("/category/{id}")
    public Set<String> deleteCategory(@PathVariable String id, @RequestBody String body)
    {
        Set<String> emptyList = null;
        Optional<Category> optCategory = repository.findById(id);
        Category category;

        if (optCategory.isPresent())
        {
            category = optCategory.get();

            try
            {
                JSONObject obj = new JSONObject(body);
                String newCategory = obj.getString("category");

                category.getCategories().remove(newCategory);
                repository.save(category);

                return category.getCategories();
            }
            catch (JSONException ex)
            {
                return emptyList;
            }
        }

        return emptyList;
    }

    /**
     *
     * @param department Naam van de Category
     * @return Returneert of het aanmaken gelukt is of niet.
     */
    @PostMapping("/department/{department}")
    public Category addDepartment(@PathVariable String department)
    {
        ArrayList<Category> categories = repository.findByDepartment(department);

        if (categories.isEmpty())
        {
            Category category = new Category("", department, new TreeSet<String>());
            repository.save(category);

            return category;
        }

        return null;
    }

    /**
     *
     * @param id van de departement
     * @return Returneert of het verwijderen gelukt is of niet.
     */
    @DeleteMapping("/department/{id}")
    public Category deleteDepartment(@PathVariable String id)
    {
        Optional<Category> optCategory = repository.findById(id);
        Category category;

        if (optCategory.isPresent())
        {
            category = optCategory.get();

            repository.delete(category);

            return category;
        }

        return null;
    }

    /**
     *
     * @return return een lijst van Categorieën die toegevoegd worden in de database
     */
    @GetMapping("/category")
    public List<Category> getAllCategory() {
        List<Category> categories;

        categories = repository.findAll();
        return categories;
    }

    /**
     *
     * @return return een lijst van Categorieën die behoren tot een bepaalde afdeling
     */
    @GetMapping("/category/{department}")
    public List<Category> getByDepartment(@PathVariable String department) {
        List<Category> categories;

        categories = repository.findByDepartment(department);
        return categories;
    }
}
