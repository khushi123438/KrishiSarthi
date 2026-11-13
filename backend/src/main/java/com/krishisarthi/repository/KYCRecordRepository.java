package com.krishisarthi.repository;

import com.krishisarthi.entity.KYCRecord;
import com.krishisarthi.entity.KYCStatus;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KYCRecordRepository extends JpaRepository<KYCRecord, Long> {
    List<KYCRecord> findByUser(User user);
    List<KYCRecord> findAllByOrderByCreatedAtDesc();
    long countByStatus(KYCStatus status);
}
