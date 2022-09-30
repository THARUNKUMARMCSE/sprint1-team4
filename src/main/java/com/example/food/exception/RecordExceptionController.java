package com.example.food.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class RecordExceptionController<RecordNotfoundException> {

	@ControllerAdvice
	public class ProductExceptionController {
		
	  @ResponseBody
	  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	   @ExceptionHandler(value = RecordNotFoundException.class)
	   public ResponseEntity<Object> exception(RecordNotfoundException exception) {
	      return new ResponseEntity<>("Record not found", HttpStatus.INTERNAL_SERVER_ERROR);
	   }
	}
}
