package com.polypoli.request;

import lombok.Data;

@Data
public class FeedUserMappingRequest {

    private Long feedId;
    private Long userId;
    private Integer like;
}
