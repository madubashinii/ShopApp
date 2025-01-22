package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.config.ResourceNotFoundException;
import com.cmjd96.shoppingApp.model.Category;
import com.cmjd96.shoppingApp.model.Product;
import com.cmjd96.shoppingApp.repo.CategoryRepo;
import com.cmjd96.shoppingApp.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    public Product createProduct(Product product, long categoryId){
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category id not found!..."));
        product.setCategory(category);
        if (!productRepo.existsById(product.getId())) {
            return this.productRepo.save(product);
        }else {
            System.out.println("Product Id already Exists!");
            return null;
        }
    }

    public List<Product> viewAll(){
        return productRepo.findAll();
    }

    public Product viewProductById(long pid){
        return productRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Product not found"));
    }

    public void deleteProduct(long pid){
        Product id=productRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Product not found"));
        productRepo.delete(id);
    }

    public Product updateProduct(long pid,Product newProduct){
        Product oldProduct=productRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Product not found"));
        oldProduct.setProductName(newProduct.getProductName());
        oldProduct.setProductBrand(newProduct.getProductBrand());
        oldProduct.setProductImg1(newProduct.getProductImg1());
        oldProduct.setProductPrice(newProduct.getProductPrice());
        oldProduct.setColor(newProduct.getColor());
        return productRepo.save(oldProduct);
    }

    public List<Product> findByProductCategory(long categoryId){
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("This id category not found!..."));
        return this.productRepo.findByCategory(category);
    }

    public List<Product> getFeaturedProducts() {
        return productRepo.findByIsFeaturedTrue();
    }

    public List<Product> searchProducts(String query){
        return productRepo.searchProducts(query);
    }

}
