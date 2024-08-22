import React from 'react';
import axios from 'axios';

const InstanceList = ({ instances, setInstances, courses }) => {

  const handleDelete = (id, academicYear, semester) => {
      console.log("Check if working...");
    axios.delete(`http://localhost:6969/api/instances/${academicYear}/${semester}/${id}`)
      .then(() => {
        setInstances(instances.filter(instance => instance.id !== id));  
      })
      .catch(error => {
        console.error("There was an error deleting the instance!", error);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Course Title</th>
          <th>Year-Sem</th>
          <th>Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {instances.map(instance => {
          const course = courses.find(course => course.id === instance.courseId);
          return (
            <tr key={instance.id}>
              <td>{instance ? instance.course['title'] : "Unknown Course"}</td>
              <td>{`${instance.academicYear}-${instance.semester}`}</td>
              <td>{instance.id}</td>
              <td className="table-actions">
                <button onClick={() => handleDelete(instance.id, instance.academicYear, instance.semester)}>🗑️</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InstanceList;
