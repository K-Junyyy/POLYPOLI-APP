package com.polypoli.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Builder
public class BillDto {
    private Long billId;
    private String date;
    private String feedContent;
    private String title;
    private String main_proposer;
    private String committee;
    private String status;
    private String main_content_and_reason;
    private String proposers;
    private String vote_result;
    private Integer likeByUser;
    private Long like;
    private Long dislike;
    private Integer day;
    private Integer week;
    private Integer month;
    private Integer year;
}
