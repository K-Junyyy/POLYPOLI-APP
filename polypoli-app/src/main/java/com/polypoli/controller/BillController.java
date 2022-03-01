package com.polypoli.controller;

import com.polypoli.model.dto.BillDto;
import com.polypoli.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BillController {

    private final BillService billService;

    @GetMapping("/bill")
    public BillDto getBill(@RequestParam String billId) {
        return billService.getBill(Long.parseLong(billId));
    }

    @GetMapping("/billWithUserId")
    public BillDto getBillWithUserId(@RequestParam String billId, @RequestParam Long userId) {
        return billService.getBill(Long.parseLong(billId), userId);
    }

    @GetMapping("/hotBills")
    public List<BillDto> getHotBills(@RequestParam Integer week, @RequestParam Integer month, @RequestParam Integer year, @RequestParam Long userKey) {
        return billService.getHotBills(week, month, year, userKey);
    }
}
