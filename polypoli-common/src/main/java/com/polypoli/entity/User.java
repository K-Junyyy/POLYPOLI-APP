package com.polypoli.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity // DB의 테이블을 뜻함
@Table(name = "user") // DB테이블의 이름을 명시
public class User {

    @Id // PK를 뜻함
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK의 생성 전략을 설정
    /*
     * GenerationType.IDENTITY : MySQL의 AUTO_INCREMENT 방식을 이용
     * GenerationType.AUTO(default) : JPA 구현체(Hibernate)가 생성 방식을 결정
     * GenerationType.SEQUENCE : DB의 SEQUENCE를 이용해서 키를 생성. @SequenceGenerator와 같이 사용
     * GenerationType.TABLE : 키 생성 전용 테이블을 생성해서 키 생성. @TableGenerator와 함께 사용
     */
    @Column(name = "user_key", unique = true)
    private Long userKey;

    @Column(name = "user_id", columnDefinition = "varchar(45)", nullable = false)
    private String userId;

    @Column(name = "user_password", columnDefinition = "varchar(20)", nullable = false)
    private String userPassword;

    @Column(name = "user_phone_number", columnDefinition = "varchar(11)", nullable = false)
    private String userPhoneNumber;

    @Column(name = "user_name", columnDefinition = "varchar(40)")
    private String userName;

    @Column(name = "user_area", columnDefinition = "varchar(255)")
    private String userArea;

    @Column(name = "user_region", columnDefinition = "varchar(45)")
    private String userRegion;

    @Column(name = "region_congressman_id", columnDefinition = "int(11)")
    private Long regionCongressmanId;

    @Column(name = "user_stamp", columnDefinition = "tinyint(1)")
    private Boolean userStamp;

    @Column(name = "user_gender", columnDefinition = "varchar(5)")
    private String userGender;

    @Column(name = "user_year_of_birth", columnDefinition = "int(4)")
    private Integer userYearOfBirth;

    @Column(name = "user_followings", columnDefinition = "text")
    private String userFollowings;

    @Column(name = "user_img", columnDefinition = "int(1)")
    private Integer userImg;

}
