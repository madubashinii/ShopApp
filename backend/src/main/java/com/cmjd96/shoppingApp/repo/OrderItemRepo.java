package com.cmjd96.shoppingApp.repo;

import com.cmjd96.shoppingApp.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {}
