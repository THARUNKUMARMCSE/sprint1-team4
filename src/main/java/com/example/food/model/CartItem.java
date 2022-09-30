package com.example.food.model;

import javax.persistence.*;

@Entity
@Table(name="cart_items")
public class CartItem {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="cartid")
	private long cartid;
	
	@ManyToOne
	@JoinColumn(name="itemid")
	private Item item;
	
	@ManyToOne
	@JoinColumn(name="customerid")
	private Customer customer;
	
	private int quantity;

	public long getCartid() {
		return cartid;
	}

	public void setCartid(long cartid) {
		this.cartid = cartid;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	@Transient
	public double getSubTotal()
	{
		return this.item.getCost()*quantity;
	}
	
	
}
