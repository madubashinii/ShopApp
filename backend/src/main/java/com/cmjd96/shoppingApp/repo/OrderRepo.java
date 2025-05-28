package com.cmjd96.shoppingApp.repo;

import com.cmjd96.shoppingApp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {}
