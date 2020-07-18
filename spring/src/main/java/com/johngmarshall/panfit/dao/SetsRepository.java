package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Sets;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SetsRepository extends CrudRepository<Sets,Long> {

  @Query(value="select * from sets where routine_entries_id=:id",nativeQuery=true)
  List<Sets> getRoutineByEntryId(int id);

}
