/*
package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.RoutineEntries;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RoutineEntriesRepository extends CrudRepository<RoutineEntries,Long> {

  List<RoutineEntries> findRoutineEntriesByRoutineWorkoutUserUserCredentialsUsername(String username);
*/
/*
OrderByEntryDateDesc
  List<RoutineEntries> findRoutineEntriesByRoutineExerciseRoutineWorkoutUserUserCredentialsUsername(String username);
*//*
*/
/*

  //@Query(value="select  SUM(sets.set_reps) from panfit_test.sets inner join  panfit_test.routine_entries on  panfit_test.routine_entries.set_id =  panfit_test.sets.id  where panfit_test.routine_entries.sessions_id=:id", nativeQuery =true)
  //int countAllSetsBySessionsId(int id);

  @Query(value="select * from routine_entries where routine_exercise_id=:id order by id limit 1",nativeQuery=true)
  Optional<RoutineEntries> getLastEntry(int id);*//*

}
*/
package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.RoutineEntries;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RoutineEntriesRepository extends CrudRepository<RoutineEntries,Long> {

  @Query(value = "select * from routine_entries where routine_id in (select id from routine where workout_id=(select workout_id from current_workout where user_id=(select user_id from user where username=:username))) order by id desc",nativeQuery = true)
  List<RoutineEntries> findAllEntriesByRoutineId(String username);
/*
OrderByEntryDateDesc
  List<RoutineEntries> findRoutineEntriesByRoutineExerciseRoutineWorkoutUserUserCredentialsUsername(String username);
*//*

  //@Query(value="select  SUM(sets.set_reps) from panfit_test.sets inner join  panfit_test.routine_entries on  panfit_test.routine_entries.set_id =  panfit_test.sets.id  where panfit_test.routine_entries.sessions_id=:id", nativeQuery =true)
  //int countAllSetsBySessionsId(int id);

  @Query(value="select * from routine_entries where routine_exercise_id=:id order by id limit 1",nativeQuery=true)
  Optional<RoutineEntries> getLastEntry(int id);*/
}
