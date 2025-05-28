package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.repo.OrderRepo;
import com.cmjd96.shoppingApp.repo.ProductRepo;
import com.cmjd96.shoppingApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserRepo userRepo;

    public Map<String, Integer> getDashboardStats() {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("totalProducts", (int) productRepo.count());
        stats.put("totalOrders", (int) orderRepo.count());
        stats.put("totalCustomers", (int) userRepo.count());
        return stats;
    }
}

