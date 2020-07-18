package com.johngmarshall.panfit.model;

import javax.persistence.*;

@Entity
public class Exercise {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @ManyToOne
  private Muscle muscle;

  @ManyToOne
  private Equipment equipment;

  private String exerciseName;

  protected Exercise() {}

  public Exercise(int id, Muscle muscle, Equipment equipment, String exercise_name) {
    this.id = id;
    this.muscle = muscle;
    this.equipment = equipment;
    this.exerciseName = exercise_name;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setMuscle(Muscle muscle) {
    this.muscle = muscle;
  }

  public void setEquipment(Equipment equipment) {
    this.equipment = equipment;
  }

  public void setExerciseName(String exerciseName) {
    this.exerciseName = exerciseName;
  }

  public int getId() {
    return id;
  }

  public Muscle getMuscle() {
    return muscle;
  }

  public Equipment getEquipment() {
    return equipment;
  }

  public String getExerciseName() {
    return exerciseName;
  }
}
