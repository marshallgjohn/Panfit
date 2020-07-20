
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.RoutineEntriesRepository;
import com.johngmarshall.panfit.model.RoutineEntries;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineEntriesService {
  private RoutineEntriesRepository routineEntriesRepository;

  public RoutineEntriesService(RoutineEntriesRepository routineEntriesRepository) {
    this.routineEntriesRepository = routineEntriesRepository;
  }


  public List<RoutineEntries> getAllEntries(String username) {
    return routineEntriesRepository.findRoutineEntriesByRoutineWorkoutUserUserCredentialsUsername(username);
  }

/*
  public Optional<RoutineEntries> getLastEntry(int id) {
    *//*return routineEntriesRepository.getLastEntry(id);*//*
  }*/

}

