package com.example.food.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.food.model.Customer;
import com.example.food.model.User;
import com.example.food.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:4200")
public class AuthController {
	
	@Autowired
	AuthService authservice;
	
	@PostMapping("/register")
	public Customer register(@RequestBody Customer customer)
	{
		return authservice.register(customer);
	}
	
	@PostMapping("/login")
	public User login(@RequestBody User user)
	{
		return authservice.login(user);
	}

}
