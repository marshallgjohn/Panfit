package com.johngmarshall.panfit.dao;

import com.johngmarshall.panfit.model.User;
import com.johngmarshall.panfit.model.UserCredentials;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
  Optional<User> findByUserCredentialsUsername(String username);

  int findUserIdByUserCredentialsUsername(String username);

}
