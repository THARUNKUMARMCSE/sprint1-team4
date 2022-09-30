package com.example.food.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.food.model.Category;
import com.example.food.repository.CategoryRepository;


@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryrepository;
	
	public List<Category> viewAllCategories()
	{
		List<Category> list = categoryrepository.findAll();
		if(list.size() > 0) {
            return list;
        } else {
            return new ArrayList<Category>();
        }
	}
	
	@Transactional
	public Category addCategory(Category category) {
		return categoryrepository.save(category);
	}
	
	@Transactional
	public long removeCategory(long theId) {
		categoryrepository.deleteById((long) theId);
		return theId;
	}
	
	@Transactional
	public Category updateCategory(Category category)
	{
		long getid=category.getCatid();
		if(getid!=0)
			categoryrepository.deleteById(getid);
		else
			throw new RuntimeException("no category found to update");
		return categoryrepository.save(category);
	}
	
	@Transactional
	public Optional<Category> getCategoryById(long id)
	{
		return categoryrepository.findById(id);
	}
}
