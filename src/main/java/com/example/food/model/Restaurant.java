package com.example.food.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;



@Entity
@Table(name= "Restaurant")
public class Restaurant {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	//@SequenceGenerator(name = "some2_seq", sequenceName = "rest_seq",allocationSize=1)
	//@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "some2_seq")
	@Column(name = "restaurantid")
	private long restaurantId;
	
	@Column(name ="restaurantname")
	private String restaurantName;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressid", referencedColumnName = "addressid")
	@OnDelete(action = OnDeleteAction.CASCADE)
    private Address address;
	
	@Column(name="managername")
	private String managerName;
	
	@Column(name="contactnumber")
	private String contactNumber;
	
	@ManyToMany(fetch = FetchType.LAZY,
		      cascade = {
		          CascadeType.PERSIST,
		          CascadeType.MERGE,
		          CascadeType.REMOVE
		      })
		  @JoinTable(name = "restaurant_item",
		        joinColumns = { @JoinColumn(name = "restaurantid") },
		        inverseJoinColumns = { @JoinColumn(name = "itemid") })
		  @OnDelete(action = OnDeleteAction.CASCADE)
		  private List<Item> items = new ArrayList<>();
	

	public Restaurant()
	{}

	public Restaurant(String restaurantName, Address address, String managerName, String contactNumber) {
		super();
		this.restaurantName = restaurantName;
		this.address=address;
		this.managerName = managerName;
		this.contactNumber = contactNumber;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public long getRestaurantId() {
		return restaurantId;
	}
	
	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}
	
	public void addItem(Item item) {
	    this.items.add(item);
	    item.getRestaurants().add(this);
	  }
	
	public void removeItem(long itemId) {
	    Item item = this.items.stream().filter(t -> t.getItemid() == itemId).findFirst().orElse(null);
	    if (item!= null) {
	      this.items.remove(item);
	      item.getRestaurants().remove(this);
	    }
	  }
}
