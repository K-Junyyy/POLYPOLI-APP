package com.polypoli.repository;

import com.polypoli.entity.Congressman;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CongressmanRepository extends JpaRepository<Congressman, Long> {

    List<Congressman> findByNameLikeAndRegionLikeAndPartyLike(String name, String region, String party);

    Congressman findByRegion(String region);
}
