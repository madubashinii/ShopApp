package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.model.Product;
import com.cmjd96.shoppingApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins="http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProducts/{categoryId}")
    public ResponseEntity<Product> createProduct(@RequestBody Product product, @PathVariable long categoryId){
        return new ResponseEntity<Product>(productService.createProduct(product,categoryId), HttpStatus.CREATED);
    }

    @RequestMapping("getAll")
    public List<Product> viewAllProduct(){
        return productService.viewAll();
    }

    @RequestMapping("getProduct/{id}")
    public Product viewProductById(@PathVariable long id){
        return productService.viewProductById(id);
    }

    @DeleteMapping("delete/{id}")
    public void  deleteProduct(@PathVariable long id){
        productService.deleteProduct(id);
    }

    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable long id,@RequestBody Product newProduct){
        return productService.updateProduct(id,newProduct);
    }

    //Find product by Category wise
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable long categoryId){
        List<Product> list = this.productService.findByProductCategory(categoryId);
        return new ResponseEntity<List<Product>>(list,HttpStatus.ACCEPTED);
    }

    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productService.getFeaturedProducts();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query){
        return ResponseEntity.ok(productService.searchProducts(query));
    }

}
