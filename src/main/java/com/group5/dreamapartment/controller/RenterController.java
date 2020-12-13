package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Renter;
import com.group5.dreamapartment.service.AddressService;
import com.group5.dreamapartment.service.RenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/renter")
public class RenterController {

    @Autowired
    private RenterService renterService;
    private AddressService addressService;

  public RenterController(AddressService addressService) {
    this.addressService = addressService;
  }

  @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String create(@RequestParam String name, @RequestParam String socialSecNumber,
                         @RequestParam long telNumber, @RequestParam String email,
                         @RequestParam String street, @RequestParam String city,
                         @RequestParam String zipCode, @RequestParam String country,
                         @RequestParam String invoiceStreet, @RequestParam String invoiceCity,
                         @RequestParam String invoiceZipCode, @RequestParam String invoiceCountry) {

      Address invoiceAddress = addressService.create(invoiceStreet, invoiceCity, invoiceZipCode, invoiceCountry);
      Address address = addressService.create(street, city, zipCode, country);
      if(!invoiceAddress.equals(address)){
        renterService.create(name, socialSecNumber, telNumber, email, address, invoiceAddress);
      } else {
        renterService.create(name, socialSecNumber, telNumber, email, address, address);
      }

      return "Name: " + name + " Social security number: " + socialSecNumber +
          " Mobile: " + telNumber + " E-mail: " + email +
          " Address: " + address + " Invoice address: " + invoiceAddress;
    }

    @GetMapping
    public Iterable<Renter> getAll() {
      return renterService.getAll();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
      try {
        renterService.deleteById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
      } catch(EmptyResultDataAccessException e) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
      }
    }

  }
