package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.MuscleRepository;
import com.johngmarshall.panfit.model.Muscle;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuscleService {
  private final MuscleRepository muscleRepository;

  public MuscleService(MuscleRepository muscleRepository) {
    this.muscleRepository = muscleRepository;
  }

  public List<Muscle> findAll() {
    return muscleRepository.findAll();
  }
}
