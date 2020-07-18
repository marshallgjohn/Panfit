package com.johngmarshall.panfit.model;

import javax.persistence.*;

@Entity
public class Sets {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;


  @ManyToOne
  private RoutineEntries routineEntries;
  private int setNumber;
  private int setWeight;
  private int setReps;


  protected Sets () {}

  public Sets(int id, int setNumber, int setWeight, int setReps) {
    this.id = id;
    this.setNumber = setNumber;
    this.setWeight = setWeight;
    this.setReps = setReps;
  }

  public int getId() {
    return id;
  }

  public int getSetNumber() {
    return setNumber;
  }

  public int getSetWeight() {
    return setWeight;
  }

  public int getSetReps() {
    return setReps;
  }
}
