package com.group5.dreamapartment.entity;

import javax.persistence.*;

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

  public String getKitchentype() {
    return kitchentype;
  }

  public void setKitchentype(String kitchentype) {
    this.kitchentype = kitchentype;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
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



  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Column
    private int size;
  @Column
    private Byte rooms;
  @Column
    private String kitchentype;
  @Column
    private String address;
  @Column
    private int apartmentNumber;
  @Column
   private int rent;

  public boolean isStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  @Column(nullable = false)
   private boolean status;
  @Column
  private String description;
  }

