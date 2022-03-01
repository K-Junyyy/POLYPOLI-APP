package com.polypoli.model.dto;

// import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userKey;
    private String userId;
    private String userPassword;
    private String userPhoneNumber;
    private String userName;
    private String userArea;
    private String userRegion;
    private Long regionCongressmanId;
    private Boolean userStamp;
    private String userGender;
    private Integer userYearOfBirth;
    private String userFollowings;
    private Integer userImg;
}