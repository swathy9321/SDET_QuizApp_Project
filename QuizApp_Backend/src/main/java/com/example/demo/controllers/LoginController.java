package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.repos.LoginRepository;

@RestController
@CrossOrigin
@RequestMapping("/quiz")
public class LoginController {
	@Autowired
	LoginRepository loginrepo;
	
	@PostMapping("/login")
	public Login login(@RequestBody Login login)throws Exception
	{
		System.out.println("Login method is invoked...........................");
		Login login_obj= null; 
		String temp_username= login.getUsername();
		String temp_password= login.getPassword();
		if(temp_username != null && temp_password!=null){
			login_obj= loginrepo.findBy_usernameAndpassword(temp_username,temp_password);
			System.out.println("Login Token:"+login_obj);
			return login_obj;
		}
		else{
//			login_obj=false;
			System.out.println("Return"+login_obj);
			throw new Exception("Invalid Credentials");
			
		}
//		return login_obj;
	}

}
