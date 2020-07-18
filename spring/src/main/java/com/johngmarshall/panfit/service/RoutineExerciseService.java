package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.RoutineExerciseRepository;
import com.johngmarshall.panfit.model.RoutineExercise;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineExerciseService {
  private RoutineExerciseRepository routineExerciseRepository;

  public RoutineExerciseService(RoutineExerciseRepository routineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }

  public List<RoutineExercise> getAllRoutineExercises(String username) {
    return routineExerciseRepository.findRoutineExercisesByRoutineWorkoutUserUserCredentialsUsername(username);
  }
  public List<RoutineExercise> getAllRoutineExercisesByRoutineId(int id) {
    return routineExerciseRepository.findRoutineExercisesByRoutineId(id);
  }

}
