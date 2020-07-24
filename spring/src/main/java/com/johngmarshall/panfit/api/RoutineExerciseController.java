package com.johngmarshall.panfit.api;


import com.johngmarshall.panfit.dao.RoutineExerciseRepository;
import com.johngmarshall.panfit.model.RoutineExercise;
import com.johngmarshall.panfit.service.RoutineExerciseService;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/routineexercises")
public class RoutineExerciseController {

  private RoutineExerciseService routineExerciseService;
  private RoutineExerciseRepository routineExerciseRepository;

  public RoutineExerciseController(RoutineExerciseService routineExerciseService, RoutineExerciseRepository routineExerciseRepository) {
    this.routineExerciseService = routineExerciseService;
    this.routineExerciseRepository = routineExerciseRepository;
  }

  @GetMapping
  public List<RoutineExercise> getAllRoutineExercises() {
    return routineExerciseService.getAllRoutineExercises(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @GetMapping(path="{id}")
  public List<RoutineExercise> getAllRoutineExercisesByRoutineId (@PathVariable("id") int id){
    return routineExerciseService.getAllRoutineExercisesByRoutineId(id);
  }

  @PostMapping
  public Iterable<RoutineExercise> addRoutineExercise(@RequestBody @NonNull List<RoutineExercise> exercise) {
    return routineExerciseRepository.saveAll(exercise);
  }

  @DeleteMapping
  public void deleteRoutineExercises(@RequestBody @NonNull List<RoutineExercise> exercises) {
    routineExerciseService.deleteRoutineExercises(exercises);
  }
}
