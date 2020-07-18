package com.johngmarshall.panfit.model;

import javax.persistence.*;

@Entity
public class CurrentWorkout {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @OneToOne
  private  User user;
  @OneToOne
  private Workout workout;
  //private final String workoutName;

  protected CurrentWorkout() {}

  public CurrentWorkout(int id, User user, Workout workout) {
    this.id = id;
    this.user = user;
    this.workout = workout;
  }

  public int getId() {
    return id;
  }


  public User getUser() {
    return user;
  }



  public Workout getWorkout() {
    return workout;
  }

}
