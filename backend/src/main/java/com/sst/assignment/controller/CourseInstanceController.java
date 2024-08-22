package com.sst.assignment.controller;

import com.sst.assignment.entity.CourseInstance;
import com.sst.assignment.exception.ResourceNotFoundException;
import com.sst.assignment.service.CourseInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instances")
public class CourseInstanceController {

    @Autowired
    private CourseInstanceService courseInstanceService;

    @GetMapping
    public List<CourseInstance> getAllInstances() {
        return courseInstanceService.getAllInstances();
    }

    @GetMapping("/{year}/{semester}")
    public List<CourseInstance> getInstancesByYearAndSemester(@PathVariable int year, @PathVariable int semester) {
        return courseInstanceService.getInstancesByYearAndSemester(year, semester);
    }

    @GetMapping("/{id}")
    public CourseInstance getInstanceById(@PathVariable Long id) {
        return courseInstanceService.getInstanceById(id)
                .orElseThrow(() -> new RuntimeException("CourseInstance not found"));
    }

    @GetMapping("/{year}/{semester}/{id}")
    public CourseInstance getInstanceByYearSemesterAndId(@PathVariable int year, @PathVariable int semester, @PathVariable Long id) {
        return courseInstanceService.getInstanceByYearSemesterAndId(year, semester, id)
                .orElseThrow(() -> new ResourceNotFoundException("CourseInstance not found for year: " + year + ", semester: " + semester + ", id: " + id));
    }

    @PostMapping
    public CourseInstance createInstance(@RequestBody CourseInstance courseInstance) {
        return courseInstanceService.createInstance(courseInstance);
    }

    @PutMapping("/{id}")
    public CourseInstance updateInstance(@PathVariable Long id, @RequestBody CourseInstance courseInstance) {
        return courseInstanceService.updateInstance(id, courseInstance);
    }

    @DeleteMapping("/{year}/{semester}/{id}")
    public void deleteInstance(@PathVariable int year, @PathVariable int semester, @PathVariable Long id) {
        CourseInstance instance = courseInstanceService.getInstanceByYearSemesterAndId(year, semester, id)
                .orElseThrow(() -> new ResourceNotFoundException("CourseInstance not found for year: " + year + ", semester: " + semester + ", id: " + id));
        courseInstanceService.deleteInstance(instance.getId());
    }

}
