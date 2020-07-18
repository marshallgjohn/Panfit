package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.EquipmentRepository;
import com.johngmarshall.panfit.model.Equipment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
  private final EquipmentRepository equipmentRepository;

  public EquipmentService(EquipmentRepository equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  public List<Equipment> findAll() {
    return equipmentRepository.findAll();
  }
}
