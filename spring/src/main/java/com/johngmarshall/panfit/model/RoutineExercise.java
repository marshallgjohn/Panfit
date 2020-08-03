package com.johngmarshall.panfit.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
public class RoutineExercise {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @OneToOne
  private Exercise exercise;

  @ManyToOne
  private Routine routine;

  protected RoutineExercise() {}

  private int routine_rest;
  private int routine_sets;
  private int routine_goal_reps_min;
  private int routine_goal_reps_max;
  private int routineWeight;
  private int routineOrder;


  public RoutineExercise(int id, Exercise exercise, Routine routine, int routine_rest, int routine_sets, int routine_goal_reps_min, int routine_goal_reps_max, int routineWeight, int routineOrder) {
    this.id = id;
    this.exercise = exercise;
    this.routine = routine;
    this.routine_rest = routine_rest;
    this.routine_sets = routine_sets;
    this.routine_goal_reps_min = routine_goal_reps_min;
    this.routine_goal_reps_max = routine_goal_reps_max;
    this.routineWeight = routineWeight;
    this.routineOrder = routineOrder;
  }

  public int getRoutineOrder() {
    return routineOrder;
  }

  public void setRoutineOrder(int routineOrder) {
    this.routineOrder = routineOrder;
  }

  public int getId() {
    return id;
  }

  public Exercise getExercise() {
    return exercise;
  }

  public Routine getRoutine() {
    return routine;
  }

  public int getRoutine_rest() {
    return routine_rest;
  }

  public int getRoutine_sets() {
    return routine_sets;
  }

  public int getRoutine_goal_reps_min() {
    return routine_goal_reps_min;
  }

  public int getRoutine_goal_reps_max() {
    return routine_goal_reps_max;
  }

  public int getRoutineWeight() {
    return routineWeight;
  }
}
