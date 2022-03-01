package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "congressman")
public class Congressman {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "congressman_id", unique = true)
    private Long congressmanId;

    @Column(columnDefinition = "varchar(45)", nullable = false)
    private String name;

    @Column(columnDefinition = "int(11)", nullable = false)
    private Long age;

    @Column(columnDefinition = "varchar(45)")
    private String gender;

    @Column(columnDefinition = "text", nullable = false)
    private String profile_image;

    @Column(columnDefinition = "varchar(45)", nullable = false)
    private String party;

    @Column(columnDefinition = "varchar(45)", nullable = false)
    private String region;

    @Column(columnDefinition = "varchar(100)")
    private String committee;

    @Column(columnDefinition = "text")
    private String academic_background;

    @Column(columnDefinition = "text")
    private String career;

    @Column(columnDefinition = "text")
    private String tel;

    @Column(columnDefinition = "text")
    private String win;
}
