package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Exercise;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExerciseRepository extends CrudRepository<Exercise,Long> {

  List<Exercise> findAll();
}
