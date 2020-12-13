package com.group5.dreamapartment.service;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.repository.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
  private AddressRepository addressRepository;

  public AddressService(AddressRepository addressRepository) {
    this.addressRepository = addressRepository;
  }

  public Address create(String street, String city, String zipCode, String country) {
    var address = new Address();
    address.setStreet(street);
    address.setCity(city);
    address.setZipCode(zipCode);
    address.setCountry(country);
    return this.addressRepository.save(address);
  }

  public Iterable<Address> getAll() {
    return this.addressRepository.findAll();
  }

}
