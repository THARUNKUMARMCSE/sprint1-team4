package com.example.food.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.food.model.CartItem;
import com.example.food.model.Customer;
import com.example.food.repository.CustomerRepository;
import com.example.food.service.ShoppingCartServices;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins="http://localhost:4200")
public class ShoppingCartController {
	
	@Autowired
	ShoppingCartServices service;
	@Autowired
	CustomerRepository custrepo;
	
	@GetMapping("/{email}")
	public ResponseEntity<List<CartItem>> showCart(@PathVariable String email)
	{
		Customer customer=custrepo.findCustomerByEmail(email);
		List<CartItem> list = service.listCartItemByCustomer(customer);
		return new ResponseEntity<List<CartItem>>(list,HttpStatus.OK);	
	}

}
