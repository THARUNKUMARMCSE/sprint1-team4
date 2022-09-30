package com.example.food.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food.model.Item;
public interface ItemRepository extends JpaRepository<Item, Long> {
	List<Item> findItemsByRestaurantsRestaurantId(Long restaurantId);


	Item findByItemnameContaining(String itemname);
}
