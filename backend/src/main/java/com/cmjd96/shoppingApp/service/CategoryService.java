package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.config.ResourceNotFoundException;
import com.cmjd96.shoppingApp.model.Category;
import com.cmjd96.shoppingApp.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    public Category createCategory(Category category){
        if (!categoryRepo.existsById(category.getCategoryId())) {
            return this.categoryRepo.save(category);
        }else {
            System.out.println("Category Id already Exists!");
            return null;
        }
    }

    public List<Category> viewAll(){
        return categoryRepo.findAll();
    }

    public Category viewCategoryById(long pid){
        return categoryRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Category not found"));
    }

    public void deleteCategory(long pid){
        Category id=categoryRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        categoryRepo.delete(id);
    }

    public Category updateCategory(long pid,Category newCategory){
        Category oldCategory=categoryRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        oldCategory.setName(newCategory.getName());
        return categoryRepo.save(oldCategory);
    }
}
