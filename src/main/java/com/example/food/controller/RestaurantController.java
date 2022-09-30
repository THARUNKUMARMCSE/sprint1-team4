package com.example.food.controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.food.exception.RecordNotFoundException;
import com.example.food.repository.RestaurantRepository;
import com.example.food.model.Address;
import com.example.food.model.Restaurant;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class RestaurantController {
	@Autowired
	RestaurantRepository restaurantRepository;
	
	@GetMapping("/restaurants")
	  public ResponseEntity<List<Restaurant>> getAllRestaurants(@RequestParam(required = false) String name) {
	    List<Restaurant> restaurants = new ArrayList<Restaurant>();

	    if (name == null)
	      restaurantRepository.findAll().forEach(restaurants::add);
	    else
	    	restaurantRepository.findByRestaurantNameContaining(name).forEach(restaurants::add);

	    if (restaurants.isEmpty()) {
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }

	    return new ResponseEntity<>(restaurants, HttpStatus.OK);
	  }
	
	@GetMapping("/restaurants/{id}")
	  public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") long id) {
	    Restaurant restaurant = restaurantRepository.findById(id)
	        .orElseThrow(() -> new RecordNotFoundException("Not found Restaurant with id = " + id));

	    return new ResponseEntity<>(restaurant, HttpStatus.OK);
	  }
	
	@PostMapping("/restaurants")
	  public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
	    Restaurant rest = restaurantRepository.save(new Restaurant(restaurant.getRestaurantName(),restaurant.getAddress(),restaurant.getManagerName(),restaurant.getContactNumber()));
	    return new ResponseEntity<>(rest, HttpStatus.CREATED);
	  }
	
	@PutMapping("/restaurants/{id}")
	  public ResponseEntity<Restaurant> updateRestaurant(@PathVariable("id") long id, @RequestBody Restaurant tutorial) {
	   Restaurant _tutorial = restaurantRepository.findById(id)
	        .orElseThrow(() -> new RecordNotFoundException("Not found Restaurant with id = " + id));

	    _tutorial.setRestaurantName(tutorial.getRestaurantName());
	    _tutorial.setAddress(tutorial.getAddress());
	    _tutorial.setManagerName(tutorial.getManagerName());
	    _tutorial.setContactNumber(tutorial.getContactNumber());
	    
	    return new ResponseEntity<>(restaurantRepository.save(_tutorial), HttpStatus.OK);
	  }
	
	@DeleteMapping("/restaurants/{id}")
	  public ResponseEntity<HttpStatus> deleteRestaurant(@PathVariable("id") long id) {
	    restaurantRepository.deleteById(id);
	    
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	  }
	
	@DeleteMapping("/restaurants")
	  public ResponseEntity<HttpStatus> deleteAllRestaurants() {
	    restaurantRepository.deleteAll();
	    
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	  }
	
	@GetMapping("/viewRestaurantbylocation")
	public ResponseEntity<List<Restaurant>> viewNearByRestaurant(@RequestBody Address address)
	{
		List<Restaurant> list=restaurantRepository.findRestaurantsByAddressAddressid(address.getAddressid());
		if (list.isEmpty()) {
		     throw new RecordNotFoundException("no restaurants in this address");
		    }
		 return new ResponseEntity<>(list, HttpStatus.OK);
	}
	

}
