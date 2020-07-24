
package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.model.Routine;
import com.johngmarshall.panfit.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/routines")
@RestController
public class RoutineController {
  private final RoutineService routineService;

  public RoutineController(RoutineService routineService) {
    this.routineService = routineService;
  }

  @GetMapping()
  public List<Routine> getAllRoutines() {
    return routineService.getAllRoutines(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @GetMapping(path="{id}")
  public Optional<Routine> getRoutineById(@PathVariable("id") int id) {
    return routineService.getRoutineById(id,(SecurityContextHolder.getContext().getAuthentication().getName()));
  }

  @PostMapping
  public Routine addRoutine( @NonNull @RequestBody Routine routine) {
    return routineService.addRoutine(routine);
  }

  @PutMapping()
  public int updateRoutineDotw(@Param("day")int day) {
    return routineService.updateRoutineDotw(day);
  }

  @DeleteMapping
  public void deleteRoutines(@RequestBody @NonNull List<Routine> routines) {
    routineService.deleteRoutines(routines);
  }
}

