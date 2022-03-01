package com.polypoli.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter // Lombok의 Getter를 이용해서 Getter메소드 생성
@NoArgsConstructor
@Entity // DB의 테이블을 뜻함
@Table(name = "region_info") // DB테이블의 이름을 명시
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "code")
    private Long id;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "town", nullable = false)
    private String town;

    @Column(name = "town_ship", nullable = false)
    private String townShip;

    @Column(name = "electoral_district", nullable = false)
    private String electoralDistrict;

}
