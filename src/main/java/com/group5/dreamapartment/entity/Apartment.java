package com.group5.dreamapartment.entity;

import javax.persistence.*;
import com.group5.dreamapartment.Kitchenstatus;

@Entity
@Table

public class Apartment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public Byte getRooms() {
    return rooms;
  }

  public void setRooms(Byte rooms) {
    this.rooms = rooms;
  }

  public Kitchenstatus getKitchenstatus() {
    return kitchenstatus;
  }

  public void setKitchenstatus(Kitchenstatus kitchenstatus) {
    this.kitchenstatus = kitchenstatus;
  }

  public String getAdress() {
    return address;
  }

  public void setAdress(String adress) {
    this.address = adress;
  }

  public int getApartmentNumber() {
    return apartmentNumber;
  }

  public void setApartmentNumber(int apartmentNumber) {
    this.apartmentNumber = apartmentNumber;
  }

  public int getRent() {
    return rent;
  }

  public void setRent(int rent) {
    this.rent = rent;
  }

  public boolean isStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  @Column
    private int size;
  @Column
    private Byte rooms;
  @Column
    private Kitchenstatus kitchenstatus;
  @Column
    private String address;
  @Column
    private int apartmentNumber;
  @Column
   private int rent;
  @Column
   private boolean status;

  }

