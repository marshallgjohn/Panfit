
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.CurrentWorkoutRepository;
import com.johngmarshall.panfit.model.CurrentWorkout;
import com.johngmarshall.panfit.model.Workout;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

  public int updateCurrentWorkout(int wid) {
    return currentWorkoutRepository.updateCurrentWorkout(wid,((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
  }

  public CurrentWorkout addCurrentWorkout (CurrentWorkout currentWorkout) {
    return currentWorkoutRepository.save(currentWorkout);
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

