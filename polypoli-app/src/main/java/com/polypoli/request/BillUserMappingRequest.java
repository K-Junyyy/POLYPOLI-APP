package com.polypoli.request;

import lombok.Data;

@Data
public class BillUserMappingRequest {

    private Long billId;
    private Long userId;
    private Integer like;
}
