package com.group5.dreamapartment.service;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.entity.Renter;
import com.group5.dreamapartment.repository.RenterRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RenterService {
  private RenterRepository renterRepository;

  public RenterService(RenterRepository renterRepository) {
    this.renterRepository = renterRepository;
  }

  public Renter create(String name, String socialSecNumber, long telNumber,
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

    return renter;
  }

  public Iterable<Renter> getAll() {
    return this.renterRepository.findAll();
  }

  public void deleteById(Long id) {
    this.renterRepository.deleteById(id);
  }

  public Renter assignAptToRenter(Apartment apt, Renter renter) {
    if (apt.getRenter() == null) {
      renter.setApartment(apt);
      return renterRepository.save(renter);
    } else {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Apartment is already occupied."
      );
    }
  }

  public Renter findRenter(Long renterID) {
    return this.renterRepository.findRenterById(renterID);
  }

  public Renter removeAptFromRnt(Renter renter) {
    renter.setApartment(null);
    return renterRepository.save(renter);
  }
}
