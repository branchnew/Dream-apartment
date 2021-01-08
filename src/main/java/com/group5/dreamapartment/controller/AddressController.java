package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Address create(@RequestParam String street, @RequestParam String city,
                         @RequestParam String zipCode, @RequestParam String country) {

      return this.addressService.create( street, city, zipCode, country );
    }

    @GetMapping
    public Iterable<Address> getAll() {
      return addressService.getAll();
    }

  }
