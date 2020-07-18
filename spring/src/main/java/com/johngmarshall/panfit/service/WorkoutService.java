package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.WorkoutRepository;
import com.johngmarshall.panfit.model.Workout;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {
  private WorkoutRepository workoutRepository;

  public WorkoutService(WorkoutRepository workoutRepository) {
    this.workoutRepository = workoutRepository;
  }

  public  Optional<Workout> getCurrentWorkout(String username) {
    System.out.println(username);
    return workoutRepository.findWorkoutById(username);
  }

  public List<Workout> findAll(String username){
    return workoutRepository.findAllByUserUserCredentialsUsername(username);
  }

  public Workout addWorkout(Workout workout) {
    return workoutRepository.save(workout);
  }

}
