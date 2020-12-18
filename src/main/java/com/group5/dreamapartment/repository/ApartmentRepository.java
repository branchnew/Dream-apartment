package com.group5.dreamapartment.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.group5.dreamapartment.entity.Apartment;

import java.util.List;

@Repository
public interface ApartmentRepository extends PagingAndSortingRepository<Apartment, Long > {
  List<Apartment> findApartmentsByStatus(boolean available);
}
