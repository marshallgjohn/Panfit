package com.johngmarshall.panfit.model;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.jdbc.Work;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Routine")
@Table(name = "routine")
public class Routine {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;


  private String routineName;
  private int routineDay;


  @ManyToOne(fetch = FetchType.LAZY)

  private Workout workout;

  protected Routine() {

  }


  public Routine(int id, String routineName, int routineDay, Workout workout) {
    this.id = id;
    this.routineName = routineName;
    this.routineDay = routineDay;
    this.workout = workout;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getRoutineName() {
    return routineName;
  }

  public void setRoutineName(String routineName) {
    this.routineName = routineName;
  }

  public int getRoutineDay() {
    return routineDay;
  }

  public void setRoutineDay(int routineDay) {
    this.routineDay = routineDay;
  }

  @JsonBackReference
  public Workout getWorkout() {
    return workout;
  }

  public void setWorkout(Workout workout) {
    this.workout = workout;
  }
}
