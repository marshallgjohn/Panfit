
package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.model.CurrentWorkout;
import com.johngmarshall.panfit.service.CurrentWorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/current")
@RestController
public class CurrentWorkoutController {
  private final CurrentWorkoutService currentWorkoutService;

  @Autowired
  public CurrentWorkoutController(CurrentWorkoutService currentWorkoutService) {
    this.currentWorkoutService = currentWorkoutService;
  }

  @GetMapping
  public Optional<CurrentWorkout> getCurrentWorkout() {
    return currentWorkoutService.getCurrentWorkout((((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()));
  }

  @PutMapping("{id}")
  public int updateCurrentWorkout(@PathVariable("id") int wid) {
    return currentWorkoutService.updateCurrentWorkout(wid);
  }

}
