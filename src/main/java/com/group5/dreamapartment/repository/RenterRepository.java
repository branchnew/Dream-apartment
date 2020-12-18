package com.group5.dreamapartment.repository;

import com.group5.dreamapartment.entity.Renter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RenterRepository extends PagingAndSortingRepository<Renter, Long >{
  Renter findRenterById(Long id);
}



