package com.example.food.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.food.model.CartItem;
import com.example.food.model.Customer;
import com.example.food.model.Item;
import com.example.food.repository.CartItemRepository;
import com.example.food.repository.ItemRepository;

@Service
public class ShoppingCartServices {
	
	@Autowired
	private CartItemRepository cartrepo;
	@Autowired
	private ItemRepository itemrepo;
	
	public List<CartItem> listCartItemByCustomer(Customer customer)
	{
		return cartrepo.findByCustomer(customer);
	}
	
	public int addProduct(long itemid,int quantity,Customer customer)
	{
		int addedquantity=quantity;
		Item item=itemrepo.findById(itemid).get();
		CartItem cartitem=cartrepo.findByCustomerAndItem(customer, item);
		if(cartitem!=null)
		{
			addedquantity=cartitem.getQuantity()+quantity;
			cartitem.setQuantity(addedquantity);
		}
		else
		{
			 cartitem=new CartItem();
			 cartitem.setQuantity(quantity);
			 cartitem.setCustomer(customer);
			 cartitem.setItem(item);
		}
		
		cartrepo.save(cartitem);
		return addedquantity;
	}
	
	@Transactional
	public double updateQuantity(long itemid,int quantity,Customer customer)
	{
		cartrepo.updateQuantity(quantity, itemid, customer.getCustomerid());
		Item item=itemrepo.findById(itemid).get();
		CartItem cart=cartrepo.findByCustomerAndItem(customer,item);
		//double subtotal=item.getCost()*quant;
		//return subtotal;
		return cart.getSubTotal();
	}
	
	@Transactional
	public void removeProduct(long itemid,Customer customer)
	{
		cartrepo.deleteByCustomerAndItem(customer.getCustomerid(), itemid);
	}
	
	@Transactional
	public void clearcart(long customerid)
	{
		cartrepo.deleteByCustomer(customerid);
	}
}
