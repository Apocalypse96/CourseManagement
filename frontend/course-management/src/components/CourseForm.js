// src/components/CourseForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onAddCourse }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { title, code, description };
    
    axios.post('http://localhost:6969/api/courses', courseData)  // Ensure this URL is correct
      .then(response => {
        onAddCourse(response.data);  // Assuming the backend returns the newly created course
        setTitle('');
        setCode('');
        setDescription('');
      })
      .catch(error => {
        console.error("There was an error saving the course!", error);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Course title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Course code" 
        value={code}
        onChange={(e) => setCode(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Course description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <button type="submit">Add course</button>
    </form>
  );
};

export default CourseForm;
