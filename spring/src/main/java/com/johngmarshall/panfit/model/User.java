package com.johngmarshall.panfit.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String email;
  

  @Embedded
  private UserCredentials userCredentials;

  protected User() {
  }

  public User(UserCredentials userCredentials) {
    this.userCredentials = userCredentials;
  }



  public String getEmail() {
    return email;
  }

  public int getId() {
    return id;
  }


  public UserCredentials getUserCredentials() {
    return userCredentials;
  }




  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return Objects.equals(id, user.id) &&
      Objects.equals(userCredentials, user.userCredentials);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, userCredentials);
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", userCredentials=" + userCredentials +
      '}';
  }


}






/*
@Entity
public class User {

  @Id
  @GeneratedValue(strategy =  GenerationType.IDENTITY)
  private int user_id;


*/
/*  private String email;*//*

  //private String current_workout;
*/
/*  @Transient
  private List<Routine> routines;
  @Transient
  private List<Workout> workouts;*//*


  @Embedded
  private UserCredentials userCredentials;
*/
/*  private final List<RoutineEntries> current_entries;*//*



  protected User() {

  }

  public User(UserCredentials userCredentials) {
*/
/*    this.user_id = user_id;
    this.email = email;
*//*
*/
/*    this.current_workout = current_workout;
    this.routines = routines;
    this.workouts = workouts;*//*


*/
/*    this.current_entries = current_entries;*//*

  }



*/
/*  public List<RoutineEntries> getCurrent_entries() {
    return current_entries;
  }*//*



*/
/*  public List<Workout> getWorkouts() {
    return workouts;
  }

  public List<Routine> getRoutines() {
    return routines;
  }

  public String getCurrent_workout() {
    return current_workout;
  }*//*


*/
/*
  public int getUser_id() {
    return user_id;
  }


  public String getEmail() {
    return email;
  }
*/



