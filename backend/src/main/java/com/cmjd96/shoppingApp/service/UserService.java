package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.model.User;
import com.cmjd96.shoppingApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean login(User user) {
        // Check if admin credentials are correct
        if ("admin".equals(user.getUsername()) && "admin123".equals(user.getPassword())) {
            return true;  // Admin login successful
        }

        // Regular user authentication using the repository
        User storedUser = userRepository.findByUsername(user.getUsername());
        if (storedUser != null && storedUser.getPassword().equals(user.getPassword())) {
            return true;  // Regular user login successful
        }

        // If no user or incorrect credentials
        return false;  // Login failed
    }


}
