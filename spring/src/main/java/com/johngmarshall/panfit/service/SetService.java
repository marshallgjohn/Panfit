
package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.SetsRepository;

import com.johngmarshall.panfit.model.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SetService {
  private final SetsRepository setsRepository;

  public SetService(SetsRepository setsRepository) {
    this.setsRepository = setsRepository;
  }

  public List<Sets> getRoutineByEntryId(int routine_entries_id) {
    return setsRepository.getRoutineByEntryId(routine_entries_id);
  }

  public Sets addSet(Sets set) {
    return setsRepository.save(set);
  }

  public List<Sets> addAllSets(List<Sets> sets) {
    return (List<Sets>) setsRepository.saveAll(sets);
  }

  public List<Sets> findAll() {
    return setsRepository.findAll();
  }

}

