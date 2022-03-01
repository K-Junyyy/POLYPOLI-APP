package com.polypoli.controller;

import com.polypoli.request.FeedUserMappingRequest;
import com.polypoli.service.FeedUserMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FeedUserMappingController {

    private final FeedUserMappingService feedUserMappingService;

    @PostMapping("/feedUserMapping")
    public void upsertFeedLike(@RequestBody FeedUserMappingRequest feedUserMappingRequest) {
        feedUserMappingService.upsertFeedLike(feedUserMappingRequest);
    }
}
