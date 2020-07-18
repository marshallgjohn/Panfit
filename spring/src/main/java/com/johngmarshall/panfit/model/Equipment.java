package com.johngmarshall.panfit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Equipment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String equipmentName;

  protected Equipment() {}

  public Equipment(int id, String equipmentName) {
    this.id = id;
    this.equipmentName = equipmentName;
  }

  public int getId() {
    return id;
  }

  public String getEquipmentName() {
    return equipmentName;
  }
}
