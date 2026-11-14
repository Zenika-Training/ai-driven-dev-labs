package com.petclinic.visit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    List<Visit> findByPetId(Long petId);

    @Query("""
            select v from Visit v
            where (:start is null or v.dateTime >= :start)
              and (:end is null or v.dateTime < :end)
            """)
    List<Visit> findByDateTimeRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
