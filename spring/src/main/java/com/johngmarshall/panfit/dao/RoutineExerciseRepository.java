package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.RoutineExercise;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoutineExerciseRepository extends CrudRepository<RoutineExercise, Long> {

  List<RoutineExercise> findRoutineExercisesByRoutineWorkoutUserUserCredentialsUsernameOrderByRoutineOrder(String username);

  List<RoutineExercise> findRoutineExercisesByRoutineId(int id);
}
