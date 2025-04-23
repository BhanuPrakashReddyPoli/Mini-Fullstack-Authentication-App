package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        Map<String, String> response = new HashMap<>();
        if (existingUser.isPresent()) {
            response.put("message", "User with this email already exists!");
            return ResponseEntity.badRequest().body(response);
        }
        userService.saveUser(user);
        response.put("message", "Registration successful! Please log in.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String result = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        Map<String, String> response = new HashMap<>();
        if (result.equals("Login Successful!")) {
            session.setAttribute("userEmail", loginRequest.getEmail());
            response.put("message", "Login Successful!");
            response.put("sessionId", session.getId());
            return ResponseEntity.ok(response);
        }
        response.put("message", result);
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/isLoggedIn")
    public ResponseEntity<Map<String, String>> isLoggedIn(HttpSession session) {
        Map<String, String> response = new HashMap<>();
        if (session.getAttribute("userEmail") != null) {
            response.put("message", "User is logged in");
            response.put("email", session.getAttribute("userEmail").toString());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Not logged in");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully!");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

}