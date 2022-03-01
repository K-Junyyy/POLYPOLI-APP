package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "feed")
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "feed_id", unique = true)
    private Long feedId;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @Column(columnDefinition = "Date", nullable = false)
    private Date date;

    @Column(name = "bill_id", columnDefinition = "int(11)")
    private Long billId;
}
