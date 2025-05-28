package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.model.Order;
import com.cmjd96.shoppingApp.model.OrderItem;
import com.cmjd96.shoppingApp.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    public Order saveOrder(Order order) {
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        return orderRepo.save(order);
    }

}

