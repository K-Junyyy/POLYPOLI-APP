package com.polypoli.repository;

import com.polypoli.entity.Congressman;
import com.polypoli.entity.FeedMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedMappingRepository extends JpaRepository<FeedMapping, Long> {

    List<FeedMapping> findByCongressman(Congressman congressman);

    Page<FeedMapping> findByCongressmanInOrderByDateDesc(List<Congressman> congressman, Pageable pageable);
}
