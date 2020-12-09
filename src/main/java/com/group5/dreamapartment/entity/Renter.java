package com.group5.dreamapartment.entity;

import javax.persistence.*;

  @Entity
  @Table

public class Renter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getSocialSecNumber() {
      return socialSecNumber;
    }

    public void setSocialSecNumber(String socialSecNumber) {
      this.socialSecNumber = socialSecNumber;
    }

    public long getTelNumber() {
      return telNumber;
    }

    public void setTelNumber(long telNumber) {
      this.telNumber = telNumber;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getAddress() {
      return address;
    }

    public void setAddress(String address) {
      this.address = address;
    }

    public String getInvoiceAddress() {
      return invoiceAddress;
    }

    public void setInvoiceAddress(String invoiceAddress) {
      this.invoiceAddress = invoiceAddress;
    }

    @Column
    private String name;
    @Column
    private String socialSecNumber;
    @Column
    private long telNumber;
    @Column
    private String email;
    @Column
    private String address;
    @Column
    private String invoiceAddress;
  }

