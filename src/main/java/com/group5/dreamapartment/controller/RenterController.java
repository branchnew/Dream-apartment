package com.group5.dreamapartment.controller;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.entity.Renter;
import com.group5.dreamapartment.service.AddressService;
import com.group5.dreamapartment.service.ApartmentService;
import com.group5.dreamapartment.service.RenterService;
import javassist.NotFoundException;
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
    private AddressService invoiceAddress;
    private ApartmentService aptService;

  public RenterController(AddressService addressService, AddressService invoiceAddress, ApartmentService aptService) {
    this.addressService = addressService;
    this.invoiceAddress = invoiceAddress;
    this.aptService = aptService;
  }

  @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Renter create(@RequestParam String name, @RequestParam String socialSecNumber,
                         @RequestParam long telNumber, @RequestParam String email,
                         @RequestParam String street, @RequestParam String city,
                         @RequestParam String zipCode, @RequestParam String country,
                         @RequestParam String invoiceStreet, @RequestParam String invoiceCity,
                         @RequestParam String invoiceZipCode, @RequestParam String invoiceCountry) {

      Address address = addressService.create(street, city, zipCode, country);
      if(street.equals(invoiceStreet) && city.equals(invoiceCity)
          && zipCode.equals(invoiceZipCode) && country.equals(invoiceCountry)){
        return renterService.create(name, socialSecNumber, telNumber, email, address, address);
      } else {
        Address invoiceAddress = addressService.create(invoiceStreet, invoiceCity, invoiceZipCode, invoiceCountry);
        return renterService.create(name, socialSecNumber, telNumber, email, address, invoiceAddress);
      }
    }

  @GetMapping
  public Iterable<Renter> getAll() {
    return renterService.getAll();
  }

  @PutMapping()
  public Renter aptToRenter(@RequestParam Long aptId, @RequestParam Long renterId) {
    Apartment apt = aptService.findApt(aptId);
    Renter renter = renterService.findRenter(renterId);
    return renterService.assignAptToRenter(apt, renter);
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

    @PutMapping(value = "/{renterId}")
    public Renter removeRntApt(@RequestParam Long renterId) {
      Renter renter = renterService.findRenter(renterId);
      return renterService.removeAptFromRnt(renter);
    }


}
