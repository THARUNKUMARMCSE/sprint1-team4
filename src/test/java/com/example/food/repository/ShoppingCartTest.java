package com.example.food.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.food.model.CartItem;
import com.example.food.model.Customer;
import com.example.food.model.Item;
import com.example.food.repository.CartItemRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
public class ShoppingCartTest {

	@Autowired
	CartItemRepository cartItemRepository;
	
	@Autowired
	TestEntityManager entityManager;
	
	@Test
	public void testAddOneCartItem()
	{
		Item item=entityManager.find(Item.class,8L);
		Customer cust=entityManager.find(Customer.class, 21L);
		CartItem cart=new CartItem();
		cart.setItem(item);
		cart.setCustomer(cust);
		cart.setQuantity(1);
		
		CartItem s=cartItemRepository.save(cart);
		assertTrue(s.getCartid()>0);
		
	}
	
	@Test
	public void testGetItemsByCustomer()
	{
		Customer customer=new Customer();
		customer.setCustomerid(21);
		
		List<CartItem> c=cartItemRepository.findByCustomer(customer);
		assertEquals(5,c.size());
	}
}
