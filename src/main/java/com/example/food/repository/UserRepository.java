package com.example.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food.model.User;

public interface UserRepository extends JpaRepository <User,String>{

}
