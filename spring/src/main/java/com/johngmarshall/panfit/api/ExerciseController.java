
package com.johngmarshall.panfit.api;


import com.johngmarshall.panfit.dao.ExerciseRepository;
import com.johngmarshall.panfit.model.Exercise;
import com.johngmarshall.panfit.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/api/exercises")
@RestController
public class ExerciseController {

  private final ExerciseService exerciseService;
  private final ExerciseRepository exerciseRepository;

  @Autowired
  public ExerciseController(ExerciseService exerciseService, ExerciseRepository exerciseRepository) {
    this.exerciseService = exerciseService;
    this.exerciseRepository = exerciseRepository;
  }



  @GetMapping
  public List<Exercise> findAll() {
    return exerciseService.findAll();
  }

  @PostMapping
  public Exercise addExercise(@RequestBody @NonNull Exercise exercise) {
    return exerciseRepository.save(exercise);
  }
}

