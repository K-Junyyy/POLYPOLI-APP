package com.polypoli.controller;

import com.polypoli.entity.Region;
import com.polypoli.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RegionController {

    private final RegionService regionService;

    @GetMapping("/getRegionList")
    public List<Region> getRegionList() {
        return regionService.getRegionList();
    }

}
