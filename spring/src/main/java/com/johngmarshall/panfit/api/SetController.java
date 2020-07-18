
package com.johngmarshall.panfit.api;

import com.johngmarshall.panfit.model.Sets;
import com.johngmarshall.panfit.service.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/sets")
@RestController
public class SetController {
  private final SetService setService;

  @Autowired
  public SetController(SetService setService) {
    this.setService = setService;
  }

  @GetMapping(path = "{id}")
  List<Sets> getSetsByEntryId(@PathVariable("id")int id) {
    return setService.getRoutineByEntryId(id);
  }
}

