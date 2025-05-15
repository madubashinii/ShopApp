package com.cmjd96.shoppingApp.repo;

import com.cmjd96.shoppingApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

//    boolean existsByEmail(String email);

    User findByUsername(String username);
}
