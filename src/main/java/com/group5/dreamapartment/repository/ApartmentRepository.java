package com.group5.dreamapartment.repository;

import org.springframework.stereotype.Repository;


@Repository
public interface ApartmentRepository<Apartment, PagingAndSortingRepository> extends PagingAndSortingRepository<Apartment, >{
}
