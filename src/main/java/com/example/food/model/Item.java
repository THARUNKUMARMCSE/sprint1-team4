package com.example.food.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="item")
public class Item {
	@Id
	//@SequenceGenerator(name = "some_seq", sequenceName = "item_seq",allocationSize=1)
	//@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "some_seq")
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="itemid")
	private long itemid;
	
	@Column(name="itemname")
	private String itemname;
	
	@OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "categoryid", referencedColumnName = "catid")
	@OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;
	
	@Column(name="cost")
	private double cost;
	
	@ManyToMany(fetch = FetchType.LAZY,
		      cascade = {
		          CascadeType.PERSIST,
		          CascadeType.MERGE,
		          CascadeType.REMOVE
		      },
		      mappedBy = "items")
		  @JsonIgnore
		  private List<Restaurant> restaurants = new ArrayList<>();
	

	public Item()
	{}

	public Item(String itemname, Category category, double cost) {
		super();
		this.itemname = itemname;
		this.category = category;
		this.cost = cost;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public long getItemid() {
		return itemid;
	}	
	
	public List<Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(List<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
}
