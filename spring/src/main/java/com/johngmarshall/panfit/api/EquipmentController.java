package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.dao.EquipmentRepository;
import com.johngmarshall.panfit.model.Equipment;
import com.johngmarshall.panfit.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/equipment")
@RestController
public class EquipmentController {
  private final EquipmentService equipmentService;
  private final EquipmentRepository equipmentRepository;

  @Autowired
  public EquipmentController(EquipmentService equipmentService, EquipmentRepository equipmentRepository) {
    this.equipmentService = equipmentService;
    this.equipmentRepository = equipmentRepository;
  }

  @GetMapping
  public List<Equipment> findAll() {
    return equipmentService.findAll();
  }

  @PostMapping
  public Equipment addEquipment(Equipment equipment) {
    return equipmentRepository.save(equipment);
  }
}
