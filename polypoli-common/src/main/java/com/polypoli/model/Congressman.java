package com.polypoli.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.ToString;

@DynamoDBTable(tableName = "congressman")
@ToString
public class Congressman {

    private Long congressmanId;
    private String name;

    @DynamoDBHashKey(attributeName = "congressman_id")
    public Long getCongressmanId() {
        return congressmanId;
    }

    public void setCongressmanId(Long congressmanId) {
        this.congressmanId = congressmanId;
    }

    @DynamoDBAttribute(attributeName = "name")
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
