package com.johngmarshall.panfit.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity(name = "RoutineEntries")
public class RoutineEntries {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name ="id")
  private int id;



  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true)
  @JsonManagedReference
  private List<Sets> set;


  @ManyToOne
  private Routine routine;


  private Date entryDate;

  @Column(name ="entryLength")
  private int entryLength;


  @Transient
  private String workoutLength;

  @Transient
  private int numOfSets;



  @Transient
  private int totalWeightLifted;



  protected RoutineEntries(){}

  public RoutineEntries(int id, List<Sets> set, Routine routine, Date entryDate, int entryLength) {
    this.id = id;
    this.set = set;
    this.routine = routine;
    this.entryDate = entryDate;
    this.entryLength = entryLength;
    this.numOfSets = getNumOfSets();
    this.workoutLength = getWorkoutLength();

  }



  @PostLoad
  public void transDataLoad() {
    int count = 0;
    for (Sets sets : this.set) {
      if (sets.getSetWeight() != 0 && sets.getSetReps() != 0) {
        count++;
      }
    }

    numOfSets = count;
    this.set.forEach(sets -> this.totalWeightLifted += sets.getSetReps()*sets.getSetWeight());

  }


  public Routine getRoutine() {
    return routine;
  }

   public String getWorkoutLength() {

    int seconds = (int)entryLength % 60;
    int hours = (int)entryLength / 60;
    int minutes = hours % 60;
    hours /= 60;

    workoutLength = String.format("%dH %2dM %2dS",hours,minutes,seconds);
    return workoutLength;
  }

  public int getEntryLength() {
    return entryLength;
  }


  public int getNumOfSets() {
    return numOfSets;
  }


  public int getTotalWeightLifted() {
    return totalWeightLifted;
  }

  public int getId() {
    return id;
  }



  public List<Sets> getSet() {
    return set;
  }



  public Date getEntryDate() {
    return entryDate;//new SimpleDateFormat("MM/dd/yyyy").format(entryDate);
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setRoutine(Routine routine) {
    this.routine = routine;
  }

  public void setEntryDate(Date entryDate) {
    this.entryDate = entryDate;
  }

  public void setWorkoutLength(String workoutLength) {
    this.workoutLength = workoutLength;
  }

  public void setNumOfSets(int numOfSets) {
    this.numOfSets = numOfSets;
  }

  public void setTotalWeightLifted(int totalWeightLifted) {
    this.totalWeightLifted = totalWeightLifted;
  }

  public void setEntryLength(int entryLength) {
    this.entryLength = entryLength;
  }
}


