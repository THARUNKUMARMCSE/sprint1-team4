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

import com.example.food.model.Category;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(true)
public class CategoryTest {
	
	@Autowired
	CategoryRepository categoryrepository;
	
	@Test
	public void addCategory()
	{
		String categoryname=null;
		Category category = new Category(2,"cakes");
		categoryrepository.save(category);
		List<Category> category1 = categoryrepository.findAll();
		for(Category c: category1) {
			if(c.getCatname().equals("cakes"))
				 categoryname = c.getCatname();
		}
		assertTrue(categoryname.equals("cakes"));
	}
	
	@Test
	public void deleteCategory()
	{
		
		List<Category> listBeforeDelete = categoryrepository.findAll();
		int sizeBeforeDelete=listBeforeDelete.size();
		
		if(sizeBeforeDelete>0) {
			categoryrepository.deleteById((long) 1);
			List<Category> listAfterDelete = categoryrepository.findAll();
			int sizeAfterDelete = listAfterDelete.size();
			
			assertTrue(sizeBeforeDelete-1==sizeAfterDelete);
		}
	}
}