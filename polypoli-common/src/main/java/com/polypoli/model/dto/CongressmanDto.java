package com.polypoli.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CongressmanDto {

    private Long congressmanId;
    private String name;
    private Long age;
    private String gender;
    private String profileImage;
    private String party;
    private String region;
    private String committee;
    private String academicBackground;
    private String career;
    private String tel;
    private List<Long> win;
}
