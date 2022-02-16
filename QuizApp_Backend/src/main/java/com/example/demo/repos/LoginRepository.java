package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {
	@Query("SELECT n from #{#entityName} n WHERE n.username = ?1 and n.password= ?2")
	public Login findBy_usernameAndpassword(String username,String password);
}
