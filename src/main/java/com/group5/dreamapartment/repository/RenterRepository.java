package com.group5.dreamapartment.repository;

import com.group5.dreamapartment.entity.Renter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

public interface RenterRepository {
  @Repository
  public interface ApartmentRepository extends PagingAndSortingRepository<Renter, Long > {
  }
}



