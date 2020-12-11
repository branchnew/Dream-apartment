package com.group5.dreamapartment.service;

import com.group5.dreamapartment.entity.Renter;
import com.group5.dreamapartment.repository.RenterRepository;
import org.springframework.stereotype.Service;

@Service
public class RenterService {
  private RenterRepository renterRepository;

  public RenterService(RenterRepository renterRepository) {
    this.renterRepository = renterRepository;
  }

  public void create(String name, String socialSecNumber, long telNumber,
                     String email, String address, String invoiceAddress) {

    var renter = new Renter();
    renter.setAddress(address);
    renter.setEmail(email);
    renter.setInvoiceAddress(invoiceAddress);
    renter.setName(name);
    renter.setSocialSecNumber(socialSecNumber);
    renter.setTelNumber(telNumber);
    this.renterRepository.save(renter);

  }

  public Iterable<Renter> getAll() {
    return this.renterRepository.findAll();
  }

  public void deleteById(Long id) {
    this.renterRepository.deleteById(id);
  }
}
