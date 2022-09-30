package com.example.food.repository;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.food.model.Restaurant;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(true)
public class RestaurantTest {
	
	@Autowired
	RestaurantRepository restaurantrepository;
	
	@Test
	public void addRestaurant()
	{
		String restaurantname = null;
		Restaurant restaurant = new Restaurant(); 
		restaurant.setRestaurantName("Mccd");
		restaurantrepository.save(restaurant);
		List<Restaurant> restaurant1 = restaurantrepository.findAll();
		for(Restaurant r: restaurant1) {
			if(r.getRestaurantName().equals("Mccd"))
				restaurantname = r.getRestaurantName();
		}
		assertTrue(restaurantname.equals("Mccd"));
	}
	
	@Test
	public void deleteRestaurant()
	{
		
		List<Restaurant> listBeforeDelete = restaurantrepository.findAll();
		int sizeBeforeDelete=listBeforeDelete.size();
		
		if(sizeBeforeDelete>0) {
			restaurantrepository.deleteById((long) 1);
			List<Restaurant> listAfterDelete = restaurantrepository.findAll();
			int sizeAfterDelete = listAfterDelete.size();
			
			assertTrue(sizeBeforeDelete-1==sizeAfterDelete);
		}
	}
}