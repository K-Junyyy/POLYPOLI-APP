package com.polypoli.repository;

import com.polypoli.entity.FeedUserMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedUserMappingRepository extends JpaRepository<FeedUserMapping, Long> {

    FeedUserMapping findByUserIdAndFeedId(Long userId, Long feedId);
}
