package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.entity.Renter;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String create(@RequestParam String name, @RequestParam String socialSecNumber,
                         @RequestParam long telNumber, @RequestParam String email,
                         @RequestParam String address, @RequestParam String invoiceAddress ) {

      renterService.create(name, socialSecNumber, telNumber, email, address, invoiceAddress);
      return "Name " + name + " Social security number " + socialSecNumber +
          " Mobile " + telNumber + " E-mail " + email +
          " Address " + address + " Invoice address " + invoiceAddress ;
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
