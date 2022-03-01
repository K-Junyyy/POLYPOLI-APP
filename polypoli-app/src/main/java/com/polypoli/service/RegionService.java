package com.polypoli.service;

import com.polypoli.entity.Region;
import com.polypoli.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionRepository regionRepository;

    public List<Region> getRegionList() {
        return regionRepository.findAll();
    }

}
