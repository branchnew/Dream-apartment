package com.group5.dreamapartment.service;


import com.group5.dreamapartment.entity.Apartment;
import com.group5.dreamapartment.repository.ApartmentRepository;
import org.springframework.stereotype.Service;

@Service
public class ApartmentService {
  private ApartmentRepository apartmentRepository;

  public ApartmentService(ApartmentRepository apartmentRepository) {
    this.apartmentRepository = apartmentRepository;
  }

  public Apartment create(String address, int apartmentNumber, boolean availble,
                        String kitchentype, int rent, Byte rooms, int size) {
    var apartment = new Apartment();

    apartment.setAddress(address);
    apartment.setApartmentNumber(apartmentNumber);
    apartment.setAvailble(availble);
    apartment.setKitchentype(kitchentype);
    apartment.setRent(rent);
    apartment.setRooms(rooms);
    apartment.setSize(size);

    return apartmentRepository.save(apartment);
  }





  /*public Iterable<Apartment> getAll() {*/
  /*  return apartmentRepository.findAll();*/
  /*}*/
}
