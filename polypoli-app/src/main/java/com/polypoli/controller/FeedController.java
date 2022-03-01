package com.polypoli.controller;

import com.polypoli.model.dto.FeedMappingDto;
import com.polypoli.request.FeedRequest;
import com.polypoli.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FeedController {

    private final FeedService feedService;

    @PostMapping("/feed")
    public List<FeedMappingDto> getFeed(@RequestBody FeedRequest feedRequest, @RequestParam("page") Integer page, @RequestParam("size") Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return feedService.getFeed(feedRequest, pageRequest);
    }
}
