package com.group5.dreamapartment.entity;

import javax.persistence.*;

@Entity
@Table
public class Address {
  public Long getId() {
    return id;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getZipCode() {
    return zipCode;
  }

  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
  }

  public String getCountry() {
    return country;
  }

  @Override
  public String toString() {
    return "Address{" +
        "id=" + id +
        ", street='" + street + '\'' +
        ", city='" + city + '\'' +
        ", zipCode='" + zipCode + '\'' +
        ", country='" + country + '\'' +
        '}';
  }

  public void setCountry(String country) {
    this.country = country;
  }

  @Column
  private String street;
  @Column
  private String city;
  @Column
  private String zipCode;
  @Column
  private String country;
}
