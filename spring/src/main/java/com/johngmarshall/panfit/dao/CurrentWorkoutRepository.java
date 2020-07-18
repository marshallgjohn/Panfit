package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.CurrentWorkout;
import com.johngmarshall.panfit.model.Workout;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CurrentWorkoutRepository extends CrudRepository<CurrentWorkout,Long> {

  Optional<CurrentWorkout> findCurrentWorkoutByUserUserCredentialsUsername(String username);
}
