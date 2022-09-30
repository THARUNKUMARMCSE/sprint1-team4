package com.example.food.repository;


import static org.junit.Assert.assertTrue;


import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

//import com.example.food.model.Category;
import com.example.food.model.Item;
//import com.example.food.model.Restaurant;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(true)
public class ItemTest {

	@Autowired
	ItemRepository itemrepository;
	
	@Autowired
	CategoryRepository categoryrepository;
	
	@Autowired
	RestaurantRepository restaurantrepository;
	
	@Autowired
	TestEntityManager entityManager;
	
	@Test
	public void addItem()
	{
		Item item=new Item();
		item.setItemname("Water");
		itemrepository.save(item);
		Item item1 = itemrepository.findByItemnameContaining("Water");
		String itemName = item1.getItemname();
		assertTrue(itemName.equals("Water"));
	}
	
	@Test
	public void deleteItem()
	{
		
		List<Item> listBeforeDelete = itemrepository.findAll();
		int sizeBeforeDelete=listBeforeDelete.size();
		
		if(sizeBeforeDelete>0) {
			itemrepository.deleteById((long) 1);
			List<Item> listAfterDelete = itemrepository.findAll();
			int sizeAfterDelete = listAfterDelete.size();
			
			assertTrue(sizeBeforeDelete-1==sizeAfterDelete);
		}
	}
	
	//not working
	/*@Test
	public void getItemByRestaurant()
	{
		Category category1 = new Category(2,"drinks");
		categoryrepository.save(category1);
		Item item1 = new Item("MilkShake",category1,100.0);
		itemrepository.save(item1);
		Restaurant restaurant = new Restaurant();
		restaurant.addItem(item1);
		restaurantrepository.save(restaurant);
		
		List<Item> item2 = itemrepository.findItemsByRestaurantsRestaurantId((long) 1);
		
		assertTrue(item2.size()>0);
	}*/

}