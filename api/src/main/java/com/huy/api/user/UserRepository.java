package com.huy.api.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{

    User findUserByUsername(String username);
    User findUserByEmail(String email);
    Page<User> findAll(Pageable pageable);
}
