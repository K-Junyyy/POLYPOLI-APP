package com.polypoli.controller;

import com.polypoli.request.BillUserMappingRequest;
import com.polypoli.request.FeedUserMappingRequest;
import com.polypoli.service.BillUserMappingService;
import com.polypoli.service.FeedUserMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BillUserMappingController {

    private final BillUserMappingService billUserMappingService;

    @PostMapping("/billUserMapping")
    public void upsertBillLike(@RequestBody BillUserMappingRequest billUserMappingRequest) {
        billUserMappingService.upsertBillLike(billUserMappingRequest);
    }
}
