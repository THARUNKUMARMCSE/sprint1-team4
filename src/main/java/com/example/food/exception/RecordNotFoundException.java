package com.example.food.exception;

public class RecordNotFoundException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RecordNotFoundException()
	{}
	
	public RecordNotFoundException(String s)
	{
		super(s);
	}

}
