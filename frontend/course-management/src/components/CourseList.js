import React from 'react';
import axios from 'axios';

const CourseList = ({ courses, setCourses }) => {

    const deleteCourse = (id) => {
        console.log("Delete function called for course with ID:", id);
        axios.delete(`http://localhost:6969/api/courses/${id}`)
            .then(() => {
                setCourses(courses.filter(course => course.id !== id));
                console.log('Course deleted successfully');
            })
            .catch(error => {
                console.error('There was an error deleting the course!', error);
            });
    };


    return (
        <table>
            <thead>
            <tr>
                <th>Course Title</th>
                <th>Code</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {courses.map(course => (
                <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.code}</td>
                    <td className="table-actions">
                        <button onClick={() => deleteCourse(course.id)}>🗑️</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CourseList;
