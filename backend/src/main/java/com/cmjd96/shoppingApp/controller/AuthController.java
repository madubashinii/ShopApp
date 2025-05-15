package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.model.User;
import com.cmjd96.shoppingApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if ("admin".equalsIgnoreCase(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "You cannot register as 'admin'."));
        }

        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken."));
        }

        userService.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully."));
    }




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean isAuthenticated = userService.login(user);

        if (isAuthenticated) {
            String role = "admin".equals(user.getUsername()) ? "ADMIN" : "USER";

            // ✅ Return JSON with role and success
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "role", role
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid credentials"));
        }
    }


}

