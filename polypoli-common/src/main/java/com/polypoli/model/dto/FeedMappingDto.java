package com.polypoli.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedMappingDto {

    private Long feedMappingId;
    private Long feedId;
    private CongressmanDto congressman;
    private FeedDto feed;
    private String date;
    private Integer like;
}
