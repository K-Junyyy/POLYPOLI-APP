package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "feed_user_mapping")
public class FeedUserMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_user_mapping_id", unique = true)
    private Long feedUserMappingId;

    @Column(name = "feed_id", columnDefinition = "int(11)", nullable = false)
    private Long feedId;

    @Column(name = "user_id", columnDefinition = "bigint(20)", nullable = false)
    private Long userId;

    @Column(name = "\"like\"", columnDefinition = "int(4)")
    private Integer like;
}