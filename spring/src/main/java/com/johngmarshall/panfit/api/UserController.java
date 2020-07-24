package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.model.User;
import com.johngmarshall.panfit.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

  private UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping()
  public User register(@RequestBody User user) {
    return userService.register(user);
  }


  @GetMapping
  public Optional<User> getUsername() {
    return userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @GetMapping("/id")
  public int getUserId() {
    return userService.findUserId(SecurityContextHolder.getContext().getAuthentication().getName());
  }

}
