package com.johngmarshall.panfit.service;

import com.johngmarshall.panfit.dao.UserRepository;
import com.johngmarshall.panfit.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {

  private static final String DEFAULT_ROLE = "ROLE_USER";
  private UserRepository userRepository;
  private BCryptPasswordEncoder encoder;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  public User register(User user) {
    setPasswordAndRole(user);
    return userRepository.save(user);
  }


  private void setPasswordAndRole(User user) {
    user.getUserCredentials()
      .setPassword(encoder.encode(user.getUserCredentials().getPassword()));
    user.getUserCredentials().setRole(DEFAULT_ROLE);
  }

  public Optional<User>  findByUsername(String username) {
    return userRepository.findByUserCredentialsUsername(username);
  }

  public int findUserId(String username) {
    return userRepository.findUserIdByUserCredentialsUsername(username);
  }
}


/*

@Service
public class UserService {
  private final UserDao userDao;
  private static final String DEFAULT_ROLE = "ROLE_USER";
  private UserRepository userRepository;
  private BCryptPasswordEncoder encoder;

  @Autowired
  public UserService(UserDao userDao, UserRepository userRepository, BCryptPasswordEncoder encoder) {
    this.userDao = userDao;
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  public User register(User user) {
    setPasswordandRole(user);
    return userRepository.save(user);
  }

  private void setPasswordandRole(User user) {
    user.getUserCredentials().setPassword(encoder.encode(user.getUserCredentials().getPassword()));
    user.getUserCredentials().setRole(DEFAULT_ROLE);
  }

  public int addUser(User user) {
    return userDao.insertUser(user);
  }

  public List<User> getAllUser() {
    return userDao.selectAllUser();
  }

  public Optional<User> getUserById(UUID id) {
    return userDao.selectUserByID(id);
  }

  public int deleteUser(UUID id) {
    return userDao.deleteUserById(id);
  }

  public int updateUser (UUID id, User user) {
    return userDao.updateUserById(id,user);
  }

  public int updateUserWorkout(UUID id, String name) {
    return userDao.updateUserWorkoutById(id,name);
  }

  public int addUserCurrentWorkout(UUID id, String name) {
    return userDao.insertUserCurrentWorkoutById(id,name);
  }

  public int loginUser(User user) {return userDao.loginUser(user);}

}
*/
