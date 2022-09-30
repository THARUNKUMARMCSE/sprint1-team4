package com.example.food.model;

import javax.persistence.*;


@Entity
@Table(name="address")
public class Address {
	
	@Id
	@SequenceGenerator(name = "some1_seq", sequenceName = "add_seq",allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "some1_seq")
	//@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="addressid")
	private long addressid;
	
	@Column(name="buildingname")
	private String buildingname;
	
	@Column(name="streetno")
	private String streetno;
	
	@Column(name="area")
	private String area;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="country")
	private String country;
	
	@Column(name="pin")
	private String pin;
	
	/*@OneToOne(mappedBy = "address",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private Restaurant restaurant;
	
	@OneToOne(mappedBy = "address",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private Customer customer;*/

	public String getBuildingname() {
		return buildingname;
	}

	public void setBuildingname(String buildingname) {
		this.buildingname = buildingname;
	}

	public String getStreetno() {
		return streetno;
	}

	public void setStreetno(String streetno) {
		this.streetno = streetno;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public long getAddressid() {
		return addressid;
	}
	
	public void setAddressid(long addressid) {
		this.addressid=addressid;
	}
	
	/*public Address()
	{ }*/
	
	/*public Address(String buildingname, String streetno, String area, String city, String state, String country,
			String pin) {
		this.buildingname = buildingname;
		this.streetno = streetno;
		this.area = area;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pin = pin;
	}*/

	

}
