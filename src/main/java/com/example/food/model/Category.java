package com.example.food.model;


import javax.persistence.*;
@Entity
@Table(name="category")
public class Category {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="catid")
	private long catid;
	
	@Column(name="catname")
	private String catname;
	
	@Transient
	@OneToOne(mappedBy = "category",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private Item item;
	
	public Category() 
	{}

	public Category( long catid,String categoryname) {
		this.catid=catid;
		this.catname = categoryname;
	}

	public long getCatid() {
		return catid;
	}
	
	public void setCatid(long catid) {
		this.catid = catid;
	}

	public String getCatname() {
		return catname;
	}

	public void setCatname(String categoryname) {
		this.catname = categoryname;
	}


	

}
