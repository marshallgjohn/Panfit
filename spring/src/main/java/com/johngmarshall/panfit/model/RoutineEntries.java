package com.johngmarshall.panfit.model;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity
public class RoutineEntries {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;


  @OneToMany
  private List<Sets> set;


  private Date entryDate;

  private long entryLength;

  @Transient
  private String workoutLength;

  @Transient
  private int numOfSets;

  @Transient
  private int totalWeightLifted;


  protected RoutineEntries(){}

  public RoutineEntries(int id, RoutineExercise routineExercise, List<Sets> set, Date entryDate, long entryLength) {
    this.id = id;
    this.set = set;
    this.entryDate = entryDate;
    this.entryLength = entryLength;
  }

  public String getWorkoutLength() {

    int seconds = (int)entryLength % 60;
    int hours = (int)entryLength / 60;
    int minutes = hours % 60;
    hours /= 60;


    return String.format("%dH %2dM %2dS",hours,minutes,seconds);
  }

  public int getNumOfSets() {
    return set.stream().mapToInt(Sets::getSetReps).sum();
  }

  public int getTotalWeightLifted() {
    set.forEach(sets -> totalWeightLifted += sets.getSetReps()*sets.getSetWeight());
    return  totalWeightLifted;
  }

  public int getId() {
    return id;
  }


  public List<Sets> getSet() {
    return set;
  }


  public String getEntryDate() {
    return new SimpleDateFormat("MM/dd/yyyy").format(entryDate);
  }

}
