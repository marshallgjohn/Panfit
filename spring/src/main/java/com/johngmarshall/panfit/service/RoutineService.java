
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.RoutineRepository;
import com.johngmarshall.panfit.dao.WorkoutRepository;
import com.johngmarshall.panfit.model.Routine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineService {

  private final RoutineRepository routineRepository;
  private final WorkoutRepository workoutRepository;

  @Autowired
  public RoutineService(RoutineRepository routineRepository, WorkoutRepository workoutRepository) {
    this.routineRepository = routineRepository;
    this.workoutRepository = workoutRepository;
  }



  public List<Routine> getAllRoutines(String username) {
    return routineRepository.getCurrentRoutines(username);
  }

  public Optional<Routine> getRoutineById(int id, String username) {
    return routineRepository.findRoutineByIdAndWorkoutUserUserCredentialsUsername(id,username);
  }

  public Routine addRoutine(Routine routine) {
    //workoutRepository.save(routine.getWorkout());
    return  routineRepository.save(routine);
  }

  public int updateRoutineDotw(int day) {
    return routineRepository.updateRoutineDotw(day,((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
  }

  public void deleteRoutines (List<Routine> routines) {
    routineRepository.deleteAll(routines);
  }
}

