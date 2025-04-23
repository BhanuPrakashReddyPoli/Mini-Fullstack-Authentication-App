package com.example.demo.service;

import com.example.demo.entity.User;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByEmail(String email);
    String validateUser(String email, String password);
}