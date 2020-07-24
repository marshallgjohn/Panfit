package com.johngmarshall.panfit.api;


import com.johngmarshall.panfit.model.Workout;
import com.johngmarshall.panfit.service.UserService;
import com.johngmarshall.panfit.service.WorkoutService;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*@CrossOrigin(origins = "*", allowedHeaders = "*")*/
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
  private WorkoutService workoutService;
  private UserController userService;

  public WorkoutController(WorkoutService workoutService) {
    this.workoutService = workoutService;
  }

  @GetMapping(path="current")
  public Optional<Workout> getCurrentWorkout() {
    return workoutService.getCurrentWorkout(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @GetMapping
  public List<Workout> findAllByUserUserCredentialsUsername() {
    return workoutService.findAll(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @PostMapping
  public Workout addWorkout(@NonNull @RequestBody Workout workout) {
    return workoutService.addWorkout(workout);
  }


/*  @GetMapping
  public List<Workout> getWorkoutByUsername() {
    //System.out.println(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
    return workoutService.getWorkoutByUsername(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
  }

  @GetMapping(path="{id}")
  public Optional<Workout> findWorkoutByWorkoutId(@PathVariable("id") int id) {
    return workoutService.findWorkoutByWorkoutId(id);
  }

  @GetMapping(path="current")
  public Workout getCurrentWorkout() {
    return workoutService.getCurrentWorkout(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
  }*/
/*
  @Autowired
  public WorkoutController(WorkoutService service) {
    this.workoutService = service;
  }

  @PostMapping()
  public void addWorkout(@NonNull @RequestBody Workout workout){
    workoutService.addWorkout(workout);
  }

  @GetMapping(path = "{id}")
  public List<Workout> getAllUserWorkouts(@PathVariable("id") UUID id) {
    return workoutService.getAllUserWorkouts(id);
  }

  @GetMapping(path = "{id}/{name}")
  public Optional<Workout> getUserWorkoutByName(@PathVariable("id") UUID id, @PathVariable("name") String name) {
    return workoutService.getUserWorkoutByName(id,name);
  }

  @DeleteMapping(path = "{id}/{name}")
  public void deleteWorkout(@PathVariable("id")UUID id, @PathVariable("name") String name) {
    workoutService.deleteWorkout(id,name);
  }*/
}
