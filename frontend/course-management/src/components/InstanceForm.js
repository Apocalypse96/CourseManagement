import React, { useState } from 'react';
import axios from 'axios';

const InstanceForm = ({ courses, onAddInstance }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [academicYear, setAcademicYear] = useState('');  // Adjusted variable name
  const [semester, setSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare instance data
    const instanceData = {
      academicYear: parseInt(academicYear),  // Adjusted parameter name
      semester: parseInt(semester),
      course: {id: parseInt(selectedCourse)},
    };

    console.log('Submitting instance data:', instanceData);

    // Make the API call to create the instance
    axios.post('http://localhost:6969/api/instances', instanceData)
      .then(response => {
        console.log('Instance created successfully:', response.data);
        onAddInstance(response.data);  // Update the state in the parent component
        setSelectedCourse('');
        setAcademicYear('');
        setSemester('');
      })
      .catch(error => {
        console.error("There was an error creating the instance!", error);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <select 
        value={selectedCourse} 
        onChange={(e) => setSelectedCourse(e.target.value)} 
        required
      >
        <option value="">Select course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>
      <input 
        type="number" 
        placeholder="Academic Year"  // Adjusted placeholder
        value={academicYear}
        onChange={(e) => setAcademicYear(e.target.value)}  // Adjusted variable name
        required 
      />
      <input 
        type="number" 
        placeholder="Semester" 
        value={semester}
        onChange={(e) => setSemester(e.target.value)} 
        required 
      />
      <button type="submit">Add instance</button>
    </form>
  );
};

export default InstanceForm;
