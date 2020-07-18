package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Muscle;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MuscleRepository extends CrudRepository<Muscle,Long> {

  List<Muscle> findAll();
}
