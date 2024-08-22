package com.sst.assignment.service;

import com.sst.assignment.entity.Course;
import com.sst.assignment.entity.CourseInstance;
import com.sst.assignment.repositories.CourseInstanceRepository;
import com.sst.assignment.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseInstanceService {

    @Autowired
    private CourseInstanceRepository courseInstanceRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseInstance> getAllInstances() {
        return courseInstanceRepository.findAll();
    }

    public List<CourseInstance> getInstancesByYearAndSemester(int academicYear, int semester) {
        return courseInstanceRepository.findByAcademicYearAndSemester(academicYear, semester);
    }

    public Optional<CourseInstance> getInstanceById(Long id) {
        return courseInstanceRepository.findById(id);
    }

    public Optional<CourseInstance> getInstanceByYearSemesterAndId(int academicYear, int semester, Long id) {
        return courseInstanceRepository.findByAcademicYearAndSemesterAndId(academicYear, semester, id);
    }

    public CourseInstance createInstance(CourseInstance courseInstance) {
        // Fetch the full Course object using the course ID from the request
        Course course = courseRepository.findById(courseInstance.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Set the full Course object to the CourseInstance
        courseInstance.setCourse(course);

        // Save and return the new CourseInstance
        return courseInstanceRepository.save(courseInstance);
    }

    public CourseInstance updateInstance(Long id, CourseInstance updatedInstance) {
        // Find the existing CourseInstance by ID
        CourseInstance existingInstance = courseInstanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CourseInstance not found"));

        // Fetch and set the full Course object based on the ID provided in the updated instance
        Course course = courseRepository.findById(updatedInstance.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existingInstance.setAcademicYear(updatedInstance.getAcademicYear());
        existingInstance.setSemester(updatedInstance.getSemester());
        existingInstance.setCourse(course);

        // Save and return the updated instance
        return courseInstanceRepository.save(existingInstance);
    }

    public void deleteInstance(Long id) {
        courseInstanceRepository.deleteById(id);
    }
}
