package com.example.food.repository;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.food.model.Customer;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(true)
public class CustomerTest {

	@Autowired
	CustomerRepository customerrepository;
	
	@Test
	public void addCustomer()
	{
		Customer customer=new Customer();
		customer.setEmail("tk5@gmail.com");
		customerrepository.save(customer);
		Customer list1 = customerrepository.findCustomerByEmail("tk5@gmail.com");
		String mail=list1.getEmail();
		assertTrue(mail.equals("tk5@gmail.com"));
	}
	
	@Test
	public void deleteCustomer()
	{
		List<Customer> listBeforeDelete = customerrepository.findAll();
		int sizeBeforeDelete=listBeforeDelete.size();
		customerrepository.deleteById((long) 1);
		List<Customer> listAfterDelete = customerrepository.findAll();
		int sizeAfterDelete = listAfterDelete.size();
		
		assertTrue(sizeBeforeDelete-1==sizeAfterDelete);
	}
	
	@Test
	public void noDuplicateEmail()
	{

		List<Customer> list = customerrepository.findAll();
		List<String> mail = new ArrayList<>();
		
		for(Customer l:list) 
			mail.add(l.getEmail());
		
		HashSet<String> hashSetMail = new HashSet<String>(mail);
		assertTrue(mail.size()==(hashSetMail.size()));
	}
}