package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends CrudRepository<Routine, Long> {

  @Query(value= "select * from routine " +
    "inner join current_workout " +
    "on current_workout.workout_id=routine.workout_id " +
    "where user_id=(select user_id from `user` where username=:username)",nativeQuery=true)
  List<Routine> getCurrentRoutines(String username);

  Optional<Routine> findRoutineByIdAndWorkoutUserUserCredentialsUsername(int id, String username);


  @Query(value = "update routine set routine_day=:day where id=(select id from routine where workout_id=(select id from workout where user_id=(select id from user where username=:username)))",nativeQuery = true)
  @Transactional
  @Modifying
  int updateRoutineDotw(int day, String username);

}
