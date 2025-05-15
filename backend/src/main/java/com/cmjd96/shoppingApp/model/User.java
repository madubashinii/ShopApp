package com.cmjd96.shoppingApp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    private String username;
    private String password;
    private String role;
    private String email;
}
