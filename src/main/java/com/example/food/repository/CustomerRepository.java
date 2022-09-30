package com.example.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long> {

	Customer findCustomerByEmail(String email);

}
