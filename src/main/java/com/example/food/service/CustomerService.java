package com.example.food.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.food.model.Customer;
import com.example.food.repository.CustomerRepository;


@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerrepository;
	
	public List<Customer> viewAllCustomers()
	{
		List<Customer> list = customerrepository.findAll();
		if(list.size() > 0) {
            return list;
        } else {
            return new ArrayList<Customer>();
        }
	}
	
	@Transactional
	public Customer addCustomer(Customer customer) {
		return customerrepository.save(customer);
	}
	
	@Transactional
	public long removeCustomer(long theId) {
		customerrepository.deleteById((long) theId);
		return theId;
	}
	
	@Transactional
	public Customer updateCustomer(Customer customer)
	{
		long getid=customer.getCustomerid();
		if(getid!=0)
			customerrepository.deleteById(getid);
		else
			throw new RuntimeException("no customer found to update");
		return customerrepository.save(customer);
	}
	
	@Transactional
	public Optional<Customer> getBillById(long id)
	{
		return customerrepository.findById(id);
	}
}