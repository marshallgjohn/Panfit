package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.CurrentWorkout;
import com.johngmarshall.panfit.model.Workout;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CurrentWorkoutRepository extends CrudRepository<CurrentWorkout,Long> {

  Optional<CurrentWorkout> findCurrentWorkoutByUserUserCredentialsUsername(String username);

  @Modifying
  @Transactional
  @Query(value = "update current_workout cw set cw.workout_id = :wid where cw.user_id =(select id from user where username=:cid)",nativeQuery = true)
  int updateCurrentWorkout(int wid,String cid);

}
