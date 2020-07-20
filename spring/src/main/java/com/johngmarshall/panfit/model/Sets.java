package com.johngmarshall.panfit.model;

import javax.persistence.*;

@Entity
public class Sets {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;


  @ManyToOne
  private RoutineEntries routineEntries;

  @ManyToOne
  private RoutineExercise routineExercise;

  private int setNumber;
  private int setWeight;
  private int setReps;
  private int setPrevWeight;


  protected Sets () {}

  public Sets(int id, RoutineEntries routineEntries, RoutineExercise routineExercise, int setNumber, int setWeight, int setReps, int setPrevWeight) {
    this.id = id;
    this.routineEntries = routineEntries;
    this.routineExercise = routineExercise;
    this.setNumber = setNumber;
    this.setWeight = setWeight;
    this.setReps = setReps;
    this.setPrevWeight = setPrevWeight;
  }

  public int getId() {
    return id;
  }

  public RoutineEntries getRoutineEntries() {
    return routineEntries;
  }

  public RoutineExercise getRoutineExercise() {
    return routineExercise;
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

  public int getSetPrevWeight() {
    return setPrevWeight;
  }
}
