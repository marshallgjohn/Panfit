package com.johngmarshall.panfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Objects;


@Embeddable
public class UserCredentials {

  @Column(unique=true)

  private String username;
  private String password;
  private String role;

  protected UserCredentials() {

  }

  public UserCredentials(String username, String password, String role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public String getUsername() {
    return username;
  }

  @JsonIgnore
  public String getPassword() {
    return password;
  }

  public String getRole() {
    return role;
  }

  @JsonProperty
  public void setPassword(String password) {
    this.password = password;
  }

  public void setRole(String role) {
    this.role = role;
  }




  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserCredentials that = (UserCredentials) o;
    return Objects.equals(username, that.username) &&
      Objects.equals(password, that.password) &&
      Objects.equals(role, that.role);
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, password, role);
  }

  @Override
  public String toString() {
    return "UserCredentials{" +
      "username='" + username + '\'' +
      ", password='" + password + '\'' +
      ", role='" + role + '\'' +
      '}';
  }
}
