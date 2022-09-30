package com.example.food.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.food.exception.RecordNotFoundException;
import com.example.food.model.Item;
import com.example.food.model.Restaurant;
import com.example.food.repository.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ItemController {
	@Autowired
	  private RestaurantRepository restaurantRepository;

	  @Autowired
	  private ItemRepository itemRepository;
	  
	  @GetMapping("/items")
	  public ResponseEntity<List<Item>> getAllItems() {
	    List<Item> tags = new ArrayList<Item>();

	    itemRepository.findAll().forEach(tags::add);

	    if (tags.isEmpty()) {
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }

	    return new ResponseEntity<>(tags, HttpStatus.OK);
	  }
	  
	  @GetMapping("/restaurants/{restId}/items")
	  public ResponseEntity<List<Item>> getAllItemsByRestaurantId(@PathVariable(value = "restId") Long restId) {
	    if (!restaurantRepository.existsById(restId)) {
	      throw new RecordNotFoundException("Not found Tutorial with id = " + restId);
	    }
	    List<Item> tags = itemRepository.findItemsByRestaurantsRestaurantId(restId);
	    return new ResponseEntity<>(tags, HttpStatus.OK);
	  }
	  
	  @GetMapping("/items/{id}")
	  public ResponseEntity<Item> getItemsById(@PathVariable(value = "id") Long id) {
	    Item tag = itemRepository.findById(id)
	        .orElseThrow(() -> new RecordNotFoundException("Not found item with id = " + id));

	    return new ResponseEntity<>(tag, HttpStatus.OK);
	  }
	  
	  @GetMapping("/items/{itemId}/restaurants")
	  public ResponseEntity<List<Restaurant>> getAllRestaurantsByItemId(@PathVariable(value = "itemId") Long itemId) {
	    if (!itemRepository.existsById(itemId)) {
	      throw new RecordNotFoundException("Not found Tag  with id = " + itemId);
	    }

	    List<Restaurant> tutorials = restaurantRepository.findRestaurantsByItemsItemid(itemId);
	    return new ResponseEntity<>(tutorials, HttpStatus.OK);
	  }
	  
	  //adding item to restaurant(item may be existing or may not)
	  @PostMapping("/restaurants/{restId}/items")
	  public ResponseEntity<Item> addItem(@PathVariable(value = "restId") Long restId, @RequestBody Item itemRequest) {
	    Item tag = restaurantRepository.findById(restId).map(restaurant -> {
	      long itemId = itemRequest.getItemid();
	      // item is existed
	      if (itemId != 0L) {
	        Item _tag = itemRepository.findById(itemId)
	            .orElseThrow(() -> new RecordNotFoundException("Not found Item with id = " + itemId));
	        restaurant.addItem(_tag);
	        restaurantRepository.save(restaurant);
	        return _tag;
	      }
	      Item newitem=itemRepository.save(itemRequest);
	      restaurant.addItem(newitem);
	      //return itemRepository.save(itemRequest);
	      return newitem;
	    }).orElseThrow(() -> new RecordNotFoundException("Not found restaurant with id = " + restId));

	    return new ResponseEntity<>(tag, HttpStatus.CREATED);
	  }
	  
	  //no need to use....
	  @PostMapping("/items")
	  public ResponseEntity<Item> createItem(@RequestBody Item item) {
		    Item item1 = itemRepository.save(new Item(item.getItemname(),item.getCategory(),item.getCost()));
		    return new ResponseEntity<>(item1, HttpStatus.CREATED);
		  }
	  
	  @PutMapping("/items/{id}")
	  public ResponseEntity<Item> updateItem(@PathVariable("id") long id, @RequestBody Item itemRequest) {
	    Item tag = itemRepository.findById(id)
	        .orElseThrow(() -> new RecordNotFoundException("TagId " + id + "not found"));

	    tag.setItemname(itemRequest.getItemname());
	    tag.setCost(itemRequest.getCost());

	    return new ResponseEntity<>(itemRepository.save(tag), HttpStatus.OK);
	  }
	  
	  @DeleteMapping("/restaurants/{restaurantId}/items/{itemId}")
	  public ResponseEntity<HttpStatus> deleteItemFromRestaurant(@PathVariable(value = "restaurantId") Long restaurantId, @PathVariable(value = "itemId") Long itemId) {
	    Restaurant restaurant = restaurantRepository.findById(restaurantId)
	        .orElseThrow(() -> new RecordNotFoundException("Not found Restaurant with id = " + restaurantId));
	    
	    restaurant.removeItem(itemId);
	   restaurantRepository.save(restaurant);
	    
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	  }
	  
	  @RequestMapping(value="/items/{id}",method=RequestMethod.DELETE)
	  //@DeleteMapping("/items/{id}")
	  public String deleteItem(@PathVariable("id") long id) {
		  Optional<Item> i=itemRepository.findById(id);
			if(i==null)
				throw new RuntimeException("item Id not found");
			itemRepository.deleteById(id);
			return "deleted item "+id;
	  }
	  

}
