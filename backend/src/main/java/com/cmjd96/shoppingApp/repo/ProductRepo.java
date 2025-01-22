package com.cmjd96.shoppingApp.repo;

import com.cmjd96.shoppingApp.model.Category;
import com.cmjd96.shoppingApp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {

    List<Product> findByCategory(Category category);


    @Query("SELECT p FROM Product p WHERE "+
            "p.productName LIKE CONCAT('%',:query,'%')" +
            "Or p.productBrand LIKE CONCAT('%',:query,'%')"+
            "Or p.color LIKE CONCAT('%',:query,'%') ")
    List<Product> searchProducts(String query);

    @Query(value = "SELECT * FROM product p WHERE "+
            "p.productName LIKE CONCAT('%',:query,'%')" +
            "Or p.productBrand LIKE CONCAT('%',:query,'%')"+
            "Or p.color LIKE CONCAT('%',:query,'%') ",nativeQuery = true)
    List<Product> searchProductsSQL(String query);

    List<Product> findByIsFeaturedTrue();
}
