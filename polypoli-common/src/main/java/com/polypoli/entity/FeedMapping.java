package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "feed_mapping")
public class FeedMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "feed_mapping_id", unique = true)
    private Long feedMappingId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "congressman_id")
    private Congressman congressman;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @Column(columnDefinition = "Date", nullable = false)
    private Date date;
}
