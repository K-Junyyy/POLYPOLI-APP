package com.polypoli.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegionDto {
    private Long code;
    private String city;
    private String town;
    private String townShip;
    private String electoralDistrict;

    public Long getCode() {
        return code;
    }

    public String getCity() {
        return city;
    }

    public String getTown() {
        return town;
    }

    public String getTownShip() {
        return townShip;
    }

    public String getElectoralDistrict() {
        return electoralDistrict;
    }

}