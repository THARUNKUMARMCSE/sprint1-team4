package com.example.food.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.food.model.*;
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	 List<Restaurant> findRestaurantsByItemsItemid(Long itemId);

	Iterable<Restaurant> findByRestaurantNameContaining(String name);

	List<Restaurant> findRestaurantsByAddressAddressid(long l);
}
