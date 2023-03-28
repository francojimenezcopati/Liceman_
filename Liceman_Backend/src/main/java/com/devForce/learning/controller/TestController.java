package com.devForce.learning.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USUARIO') or hasRole('MENTOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/mod")
  @PreAuthorize("hasRole('MENTOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }

  @GetMapping("/test")
  @PreAuthorize("hasRole('USUARIO') or hasRole('MENTOR') or hasRole('ADMIN')")
  public Object test(Authentication authentication) {
    return authentication.getDetails();
  }

  @GetMapping("/test2")
  @PreAuthorize("hasRole('USUARIO') or hasRole('MENTOR') or hasRole('ADMIN')")
  public Object test2(Authentication authentication) {
    return authentication.getPrincipal();
  }

}
