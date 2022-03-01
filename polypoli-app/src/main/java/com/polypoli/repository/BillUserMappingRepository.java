package com.polypoli.repository;

import com.polypoli.entity.BillUserMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillUserMappingRepository extends JpaRepository<BillUserMapping, Long> {

    BillUserMapping findByUserIdAndBillId(Long userId, Long billId);
}
