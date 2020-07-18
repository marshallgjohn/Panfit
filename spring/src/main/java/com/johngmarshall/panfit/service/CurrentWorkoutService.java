
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.CurrentWorkoutRepository;
import com.johngmarshall.panfit.model.CurrentWorkout;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CurrentWorkoutService {
  private final CurrentWorkoutRepository currentWorkoutRepository;

  public CurrentWorkoutService(CurrentWorkoutRepository currentWorkoutRepository) {
    this.currentWorkoutRepository = currentWorkoutRepository;
  }

  public Optional<CurrentWorkout> getCurrentWorkout(String username) {
    return currentWorkoutRepository.findCurrentWorkoutByUserUserCredentialsUsername(username);
  }

 /*  }
  public int addCurrentWorkout(CurrentWorkout currentWorkout) {
    return currentWorkoutDao.addCurrentWorkout(currentWorkout);
  }
  //int deleteExercise(int id);
  //List<Exercise> getAllExercise();
  public Optional<CurrentWorkout> getCurrentWorkoutByID(UUID id) {
    return currentWorkoutDao.getCurrentWorkoutByID(id);
  }
  public int updateCurrentWorkout(UUID id, CurrentWorkout currentWorkout) {
    return currentWorkoutDao.updateCurrentWorkout(id,currentWorkout);
  }*/
}
