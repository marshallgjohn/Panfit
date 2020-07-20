package com.johngmarshall.panfit.model;

import javax.persistence.*;

@Entity
public class Pr {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int prWeight;

  private int prReps;

  @ManyToOne
  private Sets set;


  protected Pr() {}

  public Pr(int id, int prWeight, int prReps, Sets set) {
    this.id = id;
    this.prWeight = prWeight;
    this.prReps = prReps;
    this.set = set;
  }

  public int getId() {
    return id;
  }

  public int getPrWeight() {
    return prWeight;
  }

  public int getPrReps() {
    return prReps;
  }

  public Sets getSet() {
    return set;
  }
}


