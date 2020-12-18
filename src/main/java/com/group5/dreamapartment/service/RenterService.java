package com.group5.dreamapartment.service;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.entity.Renter;
import com.group5.dreamapartment.repository.ApartmentRepository;
import com.group5.dreamapartment.repository.RenterRepository;
import org.springframework.stereotype.Service;

@Service
public class RenterService {
  private RenterRepository renterRepository;

  public RenterService(RenterRepository renterRepository) {
    this.renterRepository = renterRepository;
  }

  public void create(String name, String socialSecNumber, long telNumber,
                     String email, Address address, Address invoiceAddress) {

    var renter = new Renter();
    renter.setAddress(address);
    renter.setEmail(email);
    renter.setName(name);
    renter.setSocialSecNumber(socialSecNumber);
    renter.setTelNumber(telNumber);

    if (!invoiceAddress.equals(address)) {
      renter.setInvoiceAddress(invoiceAddress);
    } else {
      renter.setInvoiceAddress(address);
    }
    
    this.renterRepository.save(renter);

  }

  public Iterable<Renter> getAll() {
    return this.renterRepository.findAll();
  }

  public void deleteById(Long id) {
    this.renterRepository.deleteById(id);
  }

  public void assignAptToRenter(Apartment apt, Renter renter) {
    renter.setApartment(apt);
    renterRepository.save(renter);
  }

  public Renter findRenter(Long renterID) {
    return this.renterRepository.findRenterById(renterID);
  }
}
