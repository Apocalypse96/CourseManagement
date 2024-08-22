import React, { useState, useEffect } from 'react';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';
import axios from 'axios';
import './styles.css';

function App() {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);
    const [showCourses, setShowCourses] = useState(false);
    const [showInstances, setShowInstances] = useState(false);
    const [searchedInstances, setSearchedInstances] = useState([]);
    const [year, setYear] = useState(0);
    const [semester, setSemester] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch courses from backend
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:6969/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(() => {
                setError('There was an error fetching the courses.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Fetch all instances from backend
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:6969/api/instances')
            .then(response => {
                setInstances(response.data);
            })
            .catch(() => {
                setError('There was an error fetching the instances.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const addCourse = (course) => {
        setCourses([...courses, course]);
        setSuccessMessage('Course added successfully.');
        clearMessages();
    };

    const addInstance = (newInstance) => {
        setInstances([...instances, newInstance]);
        setSuccessMessage('Instance added successfully.');
        clearMessages();
    };

    const deleteInstance = (id) => {
        setInstances(instances.filter(instance => instance.id !== id));
        setSuccessMessage('Instance deleted successfully.');
        clearMessages();
    };

    // Search instances by year and semester
    const handleSearch = (e) => {
        e.preventDefault();
        var endpoint = `http://localhost:6969/api/instances`;
        if(year && semester && year > 0 && semester > 0) {
            endpoint = `http://localhost:6969/api/instances/${year}/${semester}`;
        }
        console.log('Endpoint:', endpoint);

        setLoading(true);
        axios.get(endpoint)
            .then(response => {
                setSearchedInstances(response.data);
                if (response.data.length === 0) {
                    setError('No instances found for the specified year and semester.');
                } else {
                    setSuccessMessage('Instances fetched successfully.');
                }
            })
            .catch(() => {
                setError('There was an error fetching the instances.');
            })
            .finally(() => {
                setLoading(false);
                clearMessages();
            });
    };

    const clearMessages = () => {
        setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="App">
            <h1>Course Management System</h1>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="forms-container">
                <div className="form-section">
                    <CourseForm onAddCourse={addCourse} />
                </div>
                <div className="form-section">
                    <InstanceForm courses={courses} onAddInstance={addInstance} />
                </div>
            </div>

            {/* Button to toggle the visibility of the Course List */}
            <div className="button-section">
                <button className="toggle-button" onClick={() => setShowCourses(!showCourses)}>
                    {showCourses ? 'Hide Courses' : 'Show Courses'}
                </button>
                {showCourses && (
                    <div className="list-section">
                        <CourseList
                            courses={courses}
                            setCourses={setCourses}  // To update the state
                        />
                    </div>
                )}
            </div>

            {/* Button to toggle the visibility of the Instance List */}
            <div className="button-section">
                <button className="toggle-button" onClick={() => setShowInstances(!showInstances)}>
                    {showInstances ? 'Hide Instances' : 'Show Instances'}
                </button>
                {showInstances && (
                    <div className="list-section">
                        <form className="search-form" onSubmit={handleSearch}>
                            <input
                                type="number"
                                placeholder="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                            <button type="submit" className="search-button">Search Instances</button>
                        </form>
                        <InstanceList
                            instances={searchedInstances.length > 0 ? searchedInstances : instances}
                            setInstances={setInstances}
                            courses={courses}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
