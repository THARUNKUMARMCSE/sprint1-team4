package com.example.food.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.food.exception.CannotEnterNullException;
import com.example.food.exception.RecordNotFoundException;
import com.example.food.model.Customer;
import com.example.food.repository.CustomerRepository;
import com.example.food.service.CustomerService;
@RestController
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	CustomerService service;
	@Autowired
	private CustomerRepository customerrepository;
		
	//get customer by id
	@GetMapping("/customer/{id}")
	  public ResponseEntity<Customer> getCustomerById(@PathVariable("id") long id) {
	    Customer customer = customerrepository.findById(id)
	        .orElseThrow(() -> new RecordNotFoundException("Not found Customer with id = " + id));
	    return new ResponseEntity<>(customer, HttpStatus.OK);
	  }
	
	//delete customer
	@RequestMapping(value="/Customer/{id}",method=RequestMethod.DELETE)
	public String deleteCustomer(@PathVariable long id) throws RecordNotFoundException
	{
		Optional<Customer> i=customerrepository.findById(id);
		if(i==null)
			throw new RecordNotFoundException("Customer Id not found");
		customerrepository.deleteById(id);
		return "deleted Customer "+id;
	}
	
	//get restaurant by name
	/*@GetMapping("/allcustomers/{name}")
	public ResponseEntity<List<Restaurant>> getAllCustomerByRestaurantName(@PathVariable String name)
	{
		List<Restaurant> list=restrepository.findByRestaurantName(name);
		return new ResponseEntity<List<Restaurant>>(list,new HttpHeaders(),HttpStatus.OK);
	}*/
	
	//get all customers
	@GetMapping("/allcustomers")
	public ResponseEntity<List<Customer>> getAllCustomers()
	{
		List<Customer> list=service.viewAllCustomers();
		return new ResponseEntity<List<Customer>>(list,new HttpHeaders(),HttpStatus.OK);
	}
	
	//add customer
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public Customer addCustomer(@RequestBody Customer cust) throws CannotEnterNullException
	{
		if(cust.getAddress()==null)
			 throw new CannotEnterNullException("Cannot enter restaurant name as null");
	        return (service.addCustomer(cust));
	}

}
