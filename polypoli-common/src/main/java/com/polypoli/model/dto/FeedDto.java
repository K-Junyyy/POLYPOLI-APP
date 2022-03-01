package com.polypoli.model.dto;

import lombok.Builder;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class FeedDto {

    private Long id;
    private String content;
    private String date;
    private Long billId;
}
