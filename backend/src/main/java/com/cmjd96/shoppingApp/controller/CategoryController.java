package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.model.Category;
import com.cmjd96.shoppingApp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins="http://localhost:4200")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        return new ResponseEntity<Category>(categoryService.createCategory(category), HttpStatus.CREATED);
    }

    @RequestMapping("/viewAll")
    public List<Category> viewAllCategory(){
        return categoryService.viewAll();
    }

    @RequestMapping("view/{id}")
    public Category viewCategoryById(@PathVariable long id){
        return categoryService.viewCategoryById(id);
    }

    @DeleteMapping("delete/{id}")
    public void  deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }

    @PutMapping("/update/{id}")
    public Category updateCategory(@PathVariable long id,@RequestBody Category newCategory){
        return categoryService.updateCategory(id,newCategory);
    }
}