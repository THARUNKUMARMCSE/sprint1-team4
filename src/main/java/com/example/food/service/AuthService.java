package com.example.food.service;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.food.model.Customer;
import com.example.food.model.User;
import com.example.food.repository.CustomerRepository;
import com.example.food.repository.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	CustomerRepository custrepo;
	
	@Autowired
	UserRepository userrepo;
	
	private static final SecureRandom secureRandom=new SecureRandom();
	private static final Base64.Encoder base64encoder=Base64.getUrlEncoder();

	public Customer register(Customer customer) {
		// check if user already exists
		if(checkUserExist(customer)==true)
			return null;
		customer.setToken(generateToken());
		return custrepo.save(customer);
	}

	private String generateToken() {
		byte[] token = new byte[24];
		secureRandom.nextBytes(token);
		return base64encoder.encodeToString(token);
	}

	private boolean checkUserExist(Customer customer) {
		Customer existinguser=custrepo.findCustomerByEmail(customer.getEmail());
		if(existinguser==null)
		return false;
		
		return true;
	}

	public User login(User user) {
		User existinguser=userrepo.findById(user.getEmail()).orElse(null);
		if(existinguser.getEmail().equals(user.getEmail()) && existinguser.getPassword().equals(user.getPassword())
				&& existinguser.getRole().equals(user.getRole()))
		{
			existinguser.setPassword("xxxxxx");
			return existinguser;
		}
		return null;
	}

}
