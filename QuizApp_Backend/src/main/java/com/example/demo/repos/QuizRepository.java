package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

	@Query(value = "select answer from quiz where id=?1", nativeQuery = true)
	Integer getAnswerById(int questionId);
	
	
}
