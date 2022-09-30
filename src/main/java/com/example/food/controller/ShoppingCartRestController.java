package com.example.food.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.food.model.Customer;
import com.example.food.repository.CartItemRepository;
import com.example.food.repository.CustomerRepository;
import com.example.food.service.ShoppingCartServices;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins="http://localhost:4200")
public class ShoppingCartRestController {

	@Autowired
	ShoppingCartServices service;
	
	@Autowired
	CustomerRepository custrepo;
	
	@Autowired
	CartItemRepository cartrepo;
	
	@PostMapping("/{email}/{itemid}/{quan}")
	public String addProductToCart(@PathVariable("email") String email,@PathVariable("itemid") long itemid,@PathVariable("quan") int quan)
	{
		Customer customer=custrepo.findCustomerByEmail(email);
		int addedquantity=service.addProduct(itemid, quan, customer);
		return addedquantity + " item(s) of this item was added to shopping cart";
	}
	
	@PostMapping("/update/{email}/{itemid}/{quan}")
	public String updateQuantity(@PathVariable("email") String email,@PathVariable("itemid") long itemid,@PathVariable("quan") int quan)
	{
		Customer customer=custrepo.findCustomerByEmail(email);
		double subtotal=service.updateQuantity(itemid, quan, customer);
		return String.valueOf(subtotal);
	}
	
	@DeleteMapping("/delete/{email}/{itemid}")
	public String removeProduct(@PathVariable("email") String email,@PathVariable("itemid") long itemid)
	{
		Customer customer=custrepo.findCustomerByEmail(email);
		service.removeProduct(itemid, customer);
		return "deleted the given item from cart";
	}
	
	@DeleteMapping("/clear/{email}")
	public String clearcart(@PathVariable("email") String email)
	{
		Customer customer=custrepo.findCustomerByEmail(email);
		service.clearcart(customer.getCustomerid());
		return "cart cleared";
	}
		
		
}
