
package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.model.RoutineEntries;
import com.johngmarshall.panfit.service.RoutineEntriesService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/entries")
@RestController
public class RoutineEntriesController {
  private final RoutineEntriesService routineEntriesService;

  public RoutineEntriesController(RoutineEntriesService routineEntriesService) {
    this.routineEntriesService = routineEntriesService;
  }

  @GetMapping
  List<RoutineEntries> getAllEntries() {
    return routineEntriesService.getAllEntries((((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()));
  }
/*
  //@GetMapping(path="sets/{id}")
  //public int countAll(@PathVariable("id") int id) {
   // return routineEntriesService.countSetsBySessionsId(id);
  //}

  @GetMapping(path = "last/{id}")
  public Optional<RoutineEntries> getLastEntry(@PathVariable("id")int id) {return routineEntriesService.getLastEntry(id);}*/
}

