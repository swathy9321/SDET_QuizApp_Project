package com.example.demo.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.QuizDto;
import com.example.demo.entities.Answer;
import com.example.demo.entities.Quiz;
import com.example.demo.repos.AnswerRepository;
import com.example.demo.repos.QuizRepository;

@Transactional
@Service
public class QuizService {

	@Autowired
	private QuizRepository qzrepo;
	
	@Autowired
	private AnswerRepository answerRepo;
	
	public Boolean saveAnswer(QuizDto quizDto){
		Optional<Quiz> quizEntity =qzrepo.findById(quizDto.getId());
		if(quizEntity.isPresent()) {
			Quiz qen=new Quiz();
			qen=quizEntity.get();
			Integer quiz= qzrepo.getAnswerById(qen.getId());
			Answer answerEntity=new Answer();
			answerEntity.setActualAnsId(quiz);
			answerEntity.setAnswerId(quizDto.getAnswer());
			answerEntity.setQstId(quizDto.getId());
			answerRepo.save(answerEntity);
			return true;
		}
		return false;
	}
}
