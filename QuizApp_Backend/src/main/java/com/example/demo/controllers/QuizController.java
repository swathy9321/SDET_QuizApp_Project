package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.QuizDto;
import com.example.demo.entities.Answer;
import com.example.demo.entities.Quiz;
import com.example.demo.repos.AnswerRepository;
import com.example.demo.repos.QuizRepository;
import com.example.demo.service.QuizService;



@RestController
@CrossOrigin
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	QuizRepository qzrepo;
	
	@Autowired
	AnswerRepository answerRepo;
	
	@Autowired
	QuizService quizService;

	@GetMapping("/")
	public List<Quiz> fetchAllQuiz(){
		System.out.println("fetch all quiz method is invoked............");
		return qzrepo.findAll();
	}
	
	@PostMapping("/")
	public ResponseEntity<Void> addQuiz(@RequestBody Quiz quiz){
		System.out.println("add a quiz method is invoked............");
		qzrepo.save(quiz);
		ResponseEntity<Void> re = new ResponseEntity<Void>(HttpStatus.CREATED);
		return re;
	}
	
	@DeleteMapping("/{quizid}")
	public ResponseEntity<Void> deleteQuiz(@PathVariable("quizid") int quizId){
		ResponseEntity<Void> re = new ResponseEntity<Void>(HttpStatus.OK);
		try {
			qzrepo.deleteById(quizId);
		}
		catch(EmptyResultDataAccessException e) {
			re= new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}		
		return re;		
	}
	
	@PostMapping("/save")
	public ResponseEntity<Quiz> findAnswer(@RequestBody QuizDto quiz){
		ResponseEntity<Quiz> re= null;
		//Integer quiz= qzrepo.getAnswerById(quizid);
		System.out.println("Quiz*********");
		quizService.saveAnswer(quiz);
		return re= new ResponseEntity<Quiz> (HttpStatus.OK);
		
	}
	
	@GetMapping("/fetchAll") 
	public List<Answer> fetchAllAnswer(){
		System.out.println("fetch all answer method is invoked............");
		return answerRepo.findAll();
	}
	

}
