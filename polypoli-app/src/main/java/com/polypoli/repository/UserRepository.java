package com.polypoli.repository;

import com.polypoli.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

// UsersRepository는 JpaRepository를 상속받음
// Spring Data JPA는 자동으로 스프링의 빈(bean)으로 등록
public interface UserRepository extends JpaRepository<User, Long> { // <Entity, PK타입>

    // User findById(Long userKey);

    User findByUserId(String user_id);

    User findByUserPhoneNumber(String user_phone_number);

    User findByUserName(String user_name);

    // User getByUser_phone_number(String user_phone_number);
}
