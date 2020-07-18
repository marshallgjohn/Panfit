package com.johngmarshall.panfit.model;

import javassist.Loader;
import org.hibernate.annotations.Formula;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class RoutineEntries {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  private RoutineExercise routineExercise;

  @OneToMany
  private List<Sets> set;

  @ManyToOne
  private Sessions sessions;

  private Date entry_date;

  private long workoutTime;

  @Transient
  private String workoutLength;

  @Transient
  private int numOfSets;

  @Transient
  private int totalWeightLifted;


  protected RoutineEntries(){}

  public RoutineEntries(int id, RoutineExercise routineExercise, List<Sets> set, Sessions sessions, Date entry_date, long workoutTime) {
    this.id = id;
    this.set = set;
    this.sessions = sessions;
    this.entry_date = entry_date;
    this.routineExercise = routineExercise;
    this.workoutTime = workoutTime;


  }

  public String getWorkoutLength() {

    int seconds = (int)workoutTime % 60;
    int hours = (int)workoutTime / 60;
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

  public RoutineExercise getRoutineExercise() {
    return routineExercise;
  }

  public List<Sets> getSet() {
    return set;
  }

  public Sessions getSessions() {
    return sessions;
  }

  public String getEntry_date() {
    return new SimpleDateFormat("MM/dd/yyyy").format(entry_date);
  }
}
