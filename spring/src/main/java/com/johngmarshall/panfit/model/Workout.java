package com.johngmarshall.panfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "Workout")
@Table(name = "workout")
public class Workout {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name ="id")
  private int id;

  private String workoutName;
  @ManyToOne
  private User user;

  @OneToMany(mappedBy = "workout",
    cascade = CascadeType.ALL,
    orphanRemoval = true)

  private List<Routine> routine = new ArrayList<>();


  protected Workout() { }


  public Workout(int id, String workoutName, User user, List<Routine> routine) {
    this.id = id;
    this.workoutName = workoutName;
    this.user = user;
    this.routine = routine;
  }

  public List<Routine> getRoutine() {
    return routine;
  }

  public void addRoutine(Routine routine) {
    this.routine.add(routine);
    routine.setWorkout(this);
  }

  public void removeRemove(Routine routine) {
    this.routine.remove(routine);
    routine.setWorkout(null);
  }

  public int getId() {
    return id;
  }


  public int getWorkout() {
    return id;
  }

  public String getWorkoutName() {
    return workoutName;
  }

  public User getUser() {
    return user;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setWorkoutName(String workoutName) {
    this.workoutName = workoutName;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
