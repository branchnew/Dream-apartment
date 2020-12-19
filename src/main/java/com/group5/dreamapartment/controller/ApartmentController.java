package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.service.ApartmentService;
import com.group5.dreamapartment.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/apartment")

public class ApartmentController {
  @Autowired
  private ApartmentService aptService;
  private AddressService addressService;

  public ApartmentController(AddressService addressService) {
    this.addressService = addressService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public String create(@RequestParam String street, @RequestParam String city, @RequestParam String zipCode,
                       @RequestParam String country, @RequestParam int apartmentNumber,
                       @RequestParam String kitchentype, @RequestParam int rent, @RequestParam Byte rooms,
                       @RequestParam int size, @RequestParam String description ) {

    Address address = addressService.create(street, city, zipCode, country);
    aptService.create(address, apartmentNumber, kitchentype, rent, rooms, size, description);
    return "Size: " + size + "Kvm" + " Description: " + description +
        " Address: " + address + " Rooms: " + rooms +
        " Kitchentype: " + kitchentype + " Rent: " + rent +
        " Apartment number: " + apartmentNumber;
  }

  @GetMapping
  public Iterable<Apartment> getAll() {
    return aptService.getAll();
  }

  @GetMapping(value = "/available")
  public Iterable<Apartment> getAvailableApartments() {
    return aptService.getAvailableApt();
  }

  @GetMapping(value = "/occupied")
  public Iterable<Apartment> getOccupiedApartments() {
    return aptService.getOccupiedApt();
  }


  @DeleteMapping(value = "/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") Long id) {
    try {
      aptService.deleteById(id);
      return new ResponseEntity<>(null, HttpStatus.OK);
    } catch(EmptyResultDataAccessException e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

}
