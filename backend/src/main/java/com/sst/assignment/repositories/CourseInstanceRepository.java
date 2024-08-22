package com.sst.assignment.repositories;

import com.sst.assignment.entity.CourseInstance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseInstanceRepository extends JpaRepository<CourseInstance, Long> {
    List<CourseInstance> findByAcademicYearAndSemester(int academicYear, int semester);

    Optional<CourseInstance> findByAcademicYearAndSemesterAndId(int academicYear, int semester, Long id);  // New method
}
