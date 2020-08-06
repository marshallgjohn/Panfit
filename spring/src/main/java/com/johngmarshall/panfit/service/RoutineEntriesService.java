
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.RoutineEntriesRepository;
import com.johngmarshall.panfit.model.RoutineEntries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineEntriesService {
  private RoutineEntriesRepository routineEntriesRepository;

  @Autowired
  public RoutineEntriesService(RoutineEntriesRepository routineEntriesRepository) {
    this.routineEntriesRepository = routineEntriesRepository;
  }


  public List<RoutineEntries> getAllEntries(String username) {
    return routineEntriesRepository.findRoutineEntriesByRoutineWorkoutUserUserCredentialsUsernameOrderByEntryDateDesc(username);
  }

  public RoutineEntries addEntry(RoutineEntries entry) {
    return routineEntriesRepository.save(entry);
  }

/*
  public Optional<RoutineEntries> getLastEntry(int id) {
    *//*return routineEntriesRepository.getLastEntry(id);*//*
  }*/

}

