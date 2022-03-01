package com.polypoli.request;

import lombok.Data;

@Data
public class UserFollowingsUpdateRequest {

    private Long userKey;
    private Long following;
}
