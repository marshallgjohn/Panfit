package com.johngmarshall.panfit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Muscle {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String muscleGroup;

  protected Muscle() {}

  public Muscle(int id, String muscle_group) {
    this.id = id;
    this.muscleGroup = muscle_group;
  }

  public int getId() {
    return id;
  }

  public String getMuscleGroup() {
    return muscleGroup;
  }
}
