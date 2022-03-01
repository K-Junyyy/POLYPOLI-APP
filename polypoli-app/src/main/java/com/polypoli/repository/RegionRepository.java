package com.polypoli.repository;

import com.polypoli.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

// UsersRepository는 JpaRepository를 상속받음
// Spring Data JPA는 자동으로 스프링의 빈(bean)으로 등록
public interface RegionRepository extends JpaRepository<Region, Long> { // <Entity, PK타입>

}
