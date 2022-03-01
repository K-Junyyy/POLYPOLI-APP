package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bill_id", unique = true)
    private Long billId;

    @Column(columnDefinition = "Date", nullable = false)
    private Date date;

    @Column(columnDefinition = "text")
    private String feed_content;

    @Column(columnDefinition = "text")
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String main_proposer;

    @Column(columnDefinition = "text", nullable = false)
    private String committee;

    @Column(columnDefinition = "varchar(45)", nullable = false)
    private String status;

    @Column(columnDefinition = "text")
    private String main_content_and_reason;

    @Column(columnDefinition = "text")
    private String proposers;

    @Column(columnDefinition = "text")
    private String vote_result;

    @Column(name = "\"like\"", columnDefinition = "int(11)")
    private Long like;

    @Column(name = "\"dislike\"", columnDefinition = "int(11)")
    private Long dislike;

    @Column(columnDefinition = "int(11)")
    private Integer day;

    @Column(columnDefinition = "int(11)")
    private Integer week;

    @Column(columnDefinition = "int(11)")
    private Integer month;

    @Column(columnDefinition = "int(11)")
    private Integer year;
}
