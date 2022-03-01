package com.polypoli.service;

import com.amazonaws.util.StringUtils;
import com.polypoli.entity.Congressman;
import com.polypoli.entity.FeedMapping;
import com.polypoli.entity.User;
import com.polypoli.model.dto.FeedDto;
import com.polypoli.model.dto.FeedMappingDto;
import com.polypoli.repository.CongressmanRepository;
import com.polypoli.repository.FeedMappingRepository;
import com.polypoli.repository.UserRepository;
import com.polypoli.request.FeedRequest;
import com.polypoli.request.FeedUserMappingRequest;
import com.polypoli.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final UserRepository userRepository;
    private final CongressmanRepository congressmanRepository;
    private final FeedMappingRepository feedMappingRepository;
    private final CongressmanService congressmanService;
    private final FeedUserMappingService feedUserMappingService;

    public List<FeedMappingDto> getFeed(FeedRequest request, PageRequest pageRequest) {

        Optional<User> userOptional = userRepository.findById(request.getUserKey());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            List<Congressman> congressmen = toListFollowings(user.getUserFollowings())
                    .parallelStream()
                    .map(congressmanRepository::getById)
                    .collect(Collectors.toList());
            congressmen.add(congressmanRepository.getById(user.getRegionCongressmanId()));
            Page<FeedMapping> entities = feedMappingRepository.findByCongressmanInOrderByDateDesc(congressmen,
                    pageRequest);
            return entities.stream().map(entity -> {
                Integer like = feedUserMappingService.getFeedLikeByUser(getFeedUserMappingRequest(entity, user));
                return FeedMappingDto.builder()
                        .feedMappingId(entity.getFeedMappingId())
                        .feedId(entity.getFeed().getFeedId())
                        .congressman(congressmanService.toCongressmanDto(entity.getCongressman()))
                        .feed(toFeedDto(entity))
                        .like(like)
                        .build();
            }).collect(Collectors.toList());
        }
        return null;
    }

    private FeedDto toFeedDto(FeedMapping entity) {
        return FeedDto.builder()
                .id(entity.getFeed().getFeedId())
                .content(entity.getFeed().getContent())
                .date(CommonUtils.dateToString(entity.getFeed().getDate()))
                .billId(entity.getFeed().getBillId())
                .build();
    }

    private List<Long> toListFollowings(String user_followings) {
        if (StringUtils.isNullOrEmpty(user_followings))
            return Collections.emptyList();
        return Arrays.stream(user_followings.split(","))
                .map(Long::parseLong)
                .collect(Collectors.toList());
    }

    private FeedUserMappingRequest getFeedUserMappingRequest(FeedMapping feedMapping, User user) {
        FeedUserMappingRequest feedUserMappingRequest = new FeedUserMappingRequest();
        feedUserMappingRequest.setFeedId(feedMapping.getFeed().getFeedId());
        feedUserMappingRequest.setUserId(user.getUserKey());
        return feedUserMappingRequest;
    }
}
