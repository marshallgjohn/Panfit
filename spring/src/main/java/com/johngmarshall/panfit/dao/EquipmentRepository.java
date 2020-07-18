package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.Equipment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EquipmentRepository extends CrudRepository<Equipment, Long> {
  List<Equipment> findAll();
}
