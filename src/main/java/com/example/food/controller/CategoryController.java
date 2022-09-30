package com.example.food.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.food.exception.RecordNotFoundException;
import com.example.food.model.Category;
import com.example.food.repository.CategoryRepository;
import com.example.food.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	CategoryService service;
	@Autowired
	CategoryRepository repository;
	
	//display all category
	@GetMapping("/allcategories")
	public ResponseEntity<List<Category>> getAllCategory()
	{
		List<Category> list=service.viewAllCategories();
		return new ResponseEntity<List<Category>>(list,new HttpHeaders(),HttpStatus.OK);
	}
	
	//add category
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public Category addCategory(@RequestBody Category cat)
	{
		//return service.addCategory(cat);
		return repository.save(cat);
	}
	
	//delete category
	@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	public String deleteCategory(@PathVariable long id) throws RecordNotFoundException
	{
		Optional<Category> i=service.getCategoryById(id);
		if(i==null)
			throw new RecordNotFoundException("item Id not found");
		service.removeCategory(id);
		return "deleted category "+id;
		
	}
	
	//get category by id
	@GetMapping("/category/{id}")
	public Optional<Category> getcat(@PathVariable long id)
	{
		return repository.findById(id);
	}
}
