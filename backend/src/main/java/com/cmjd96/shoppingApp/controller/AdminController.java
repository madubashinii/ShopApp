package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins="http://localhost:4200")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Integer>> getDashboardStats() {
        Map<String, Integer> stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}

