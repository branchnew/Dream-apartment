package com.group5.dreamapartment.entity;

import com.sun.istack.NotNull;
import com.sun.istack.Nullable;

import javax.persistence.*;

@Entity
@Table
public class Renter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Address getAddress() {
      return address;
    }

    public void setAddress(Address address) {
      this.address = address;
    }

    public Address getInvoiceAddress() {
      return invoiceAddress;
    }

    public void setInvoiceAddress(Address invoiceAddress) {
      this.invoiceAddress = invoiceAddress;
    }

    public void setApartment(Apartment apartment) {
      this.apartment = apartment;
    }

    public Apartment getApartment() {
      return apartment;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn()
    @Nullable
    private Apartment apartment;
    @Column
    private String name;
    @Column
    private String socialSecNumber;
    @Column
    private long telNumber;
    @Column
    private String email;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn()
    private Address address;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn()
    private Address invoiceAddress;
  }

