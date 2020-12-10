package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.Kitchentype;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/apartment")

public class ApartmentController {
  @Autowired
  private ApartmentService aptService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public String create(
                       @RequestParam String address, @RequestParam int apartmentNumber, @RequestParam boolean availble,
                       @RequestParam String kitchentype, @RequestParam int rent, @RequestParam Byte rooms, @RequestParam int size) {
    aptService.create(address, apartmentNumber, availble, kitchentype, rent, rooms, size);
    return "Size " + size +
        " Address " + address + " Rooms " + rooms +
        " Kitchentype " + kitchentype + " Rent " + rent +
        " Availble " + availble + " Apartment number " + apartmentNumber;
  }

  @GetMapping
  public Iterable<Apartment> getAll() {
    return aptService.getAll();
  }

}
