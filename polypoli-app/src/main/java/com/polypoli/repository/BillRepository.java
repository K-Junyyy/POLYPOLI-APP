package com.polypoli.repository;

import com.polypoli.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    Bill getByBillId(Long bill_id);

    List<Bill> findByWeekAndMonthAndYear(Integer week, Integer month, Integer year);
}
