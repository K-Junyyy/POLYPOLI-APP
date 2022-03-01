package com.polypoli.service;

import com.polypoli.entity.FeedUserMapping;
import com.polypoli.repository.FeedUserMappingRepository;
import com.polypoli.request.FeedUserMappingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedUserMappingService {

    private final FeedUserMappingRepository feedUserMappingRepository;

    public Integer getFeedLikeByUser(FeedUserMappingRequest request) {
        FeedUserMapping entity = feedUserMappingRepository.findByUserIdAndFeedId(request.getUserId(), request.getFeedId());
        if(Objects.isNull(entity) || entity.getLike() == 0)
            return 0;
        else if(entity.getLike() < 0)
            return -1;
        else
            return 1;
    }

    public void upsertFeedLike(FeedUserMappingRequest request) {
        FeedUserMapping entity = feedUserMappingRepository.findByUserIdAndFeedId(request.getUserId(), request.getFeedId());
        if(Objects.isNull(entity)) {
            entity = new FeedUserMapping();
            entity.setUserId(request.getUserId());
            entity.setFeedId(request.getFeedId());
        }
        entity.setLike(request.getLike());
        feedUserMappingRepository.save(entity);
    }
}
