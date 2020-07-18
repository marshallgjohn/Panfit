package com.johngmarshall.panfit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Sessions {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  protected Sessions () {}

  public Sessions(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }
}
