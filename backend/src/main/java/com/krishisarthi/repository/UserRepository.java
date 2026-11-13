package com.krishisarthi.repository;

import com.krishisarthi.entity.User;
import com.krishisarthi.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByMobile(String mobile);

    Optional<User> findByEmailOrMobile(String email, String mobile);

    Boolean existsByEmail(String email);

    Boolean existsByMobile(String mobile);

    List<User> findByRoleOrderByCreatedAtDesc(UserRole role);

    List<User> findAllByOrderByCreatedAtDesc();

    long countByRole(UserRole role);
}
