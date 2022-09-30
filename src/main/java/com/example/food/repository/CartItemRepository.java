package com.example.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.food.model.CartItem;
import com.example.food.model.Customer;
import com.example.food.model.Item;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
	public List<CartItem> findByCustomer(Customer customer);
	
	public CartItem findByCustomerAndItem(Customer customer,Item item);
	
	@Query("UPDATE CartItem c SET c.quantity = ?1 WHERE c.item.itemid = ?2 AND c.customer.customerid = ?3")
	@Modifying
	public void updateQuantity(int quantity,long itemid,long customerid);
	
	@Query("DELETE FROM CartItem c WHERE c.customer.customerid=?1 AND c.item.itemid=?2")
	@Modifying
	public void deleteByCustomerAndItem(long customerid,long itemid);

	@Query("DELETE FROM CartItem c WHERE c.customer.customerid=?1")
	@Modifying
	public void deleteByCustomer(long customerid);
}
