package com.group5.dreamapartment.entity;

import javax.persistence.*;

@Entity
@Table
public class Apartment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
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

  public boolean isAvailble() {
    return availble;
  }

  public void setAvailble(boolean availble) {
    this.availble = availble;
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
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn()
    private Address address;
  @Column
    private int apartmentNumber;
  @Column
   private int rent;
  @Column
   private boolean availble;
  @Column
  private String description;
  }

