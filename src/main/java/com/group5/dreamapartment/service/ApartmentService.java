package com.group5.dreamapartment.service;

import com.group5.dreamapartment.entity.Address;
import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.repository.ApartmentRepository;
import org.springframework.stereotype.Service;

@Service
public class ApartmentService {
  private ApartmentRepository apartmentRepository;
  private String perfectCondition = "Denna lägenheten är i fint skick";

  public ApartmentService(ApartmentRepository apartmentRepository) {
    this.apartmentRepository = apartmentRepository;
  }


  public Apartment create(Address address, int apartmentNumber, String kitchentype,
                          int rent, Byte rooms, int size, String description) {

    var apartment = new Apartment();
    apartment.setAddress(address);
    apartment.setApartmentNumber(apartmentNumber);
    apartment.setKitchentype(kitchentype);
    apartment.setRent(rent);
    apartment.setRooms(rooms);
    apartment.setSize(size);

    if(description.isEmpty()){
      apartment.setDescription(perfectCondition);
    } else {
      apartment.setDescription(description);
    }
    return apartmentRepository.save(apartment);
  }

  public Iterable<Apartment> getAll() {
   return apartmentRepository.findAll();
  }

  public Iterable<Apartment> getAvailableApt() {
    return apartmentRepository.findApartmentsByRenterIsNull();
  }

  public Iterable<Apartment> getOccupiedApt() {
    return apartmentRepository.findApartmentsByRenterIsNotNull();
  }

  public void deleteById(Long id) {
    Apartment apt = this.findApt(id);
    if (apt.getRenter() != null) {
      throw new IllegalStateException("Apartment is not vacant, thus cannot be deleted");
    }
    apartmentRepository.deleteById(id);
  }

  public Apartment findApt(Long aptId) {
    return this.apartmentRepository.findApartmentById(aptId);
  }
}
