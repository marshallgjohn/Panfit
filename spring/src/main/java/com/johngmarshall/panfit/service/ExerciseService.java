
package com.johngmarshall.panfit.service;


import com.johngmarshall.panfit.dao.ExerciseRepository;
import com.johngmarshall.panfit.model.Exercise;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
  private final ExerciseRepository exerciseRepository;


  public ExerciseService(ExerciseRepository exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  public List<Exercise> findAll() {
    return exerciseRepository.findAll();
  }
}

