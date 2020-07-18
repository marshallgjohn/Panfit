package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Workout;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository  extends CrudRepository<Workout,Long> {

  Optional<Workout> findWorkoutById(String username);

  List<Workout> findAllByUserUserCredentialsUsername(String username);



/*  @Query(value = "select * from workout where user_id=(select user_id from user where username=:username)", nativeQuery=true)
  List<Workout> findWorkoutsByUsername(String username);

  @Query(value = "select * from workout where workout_id=(select workout_id from current_workout where user_id=(select user_id from user where username=:username))", nativeQuery=true)
  Workout getCurrentWorkout(String username);

  Optional<Workout> findWorkoutByWorkoutId(int id);*/
}
