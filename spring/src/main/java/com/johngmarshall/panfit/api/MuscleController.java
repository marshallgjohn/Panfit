package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.dao.MuscleRepository;
import com.johngmarshall.panfit.model.Muscle;
import com.johngmarshall.panfit.service.MuscleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/muscles")
@RestController
public class MuscleController {
  private final MuscleService muscleService;
  private final MuscleRepository muscleRepository;

  @Autowired
  public MuscleController(MuscleService muscleService, MuscleRepository muscleRepository) {
    this.muscleService = muscleService;
    this.muscleRepository = muscleRepository;
  }

  @GetMapping
  public List<Muscle> findAll() {
    return muscleService.findAll();
  }

  @PostMapping
  public Muscle addMuscle(Muscle muscle) {
    return  muscleRepository.save(muscle);
  }
}
