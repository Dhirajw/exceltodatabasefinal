import React, { useEffect, useState } from 'react';
import api, { setAuthToken } from '../src/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        console.log('Fetched courses:', response.data);
        // Access the courses array within the `data` field
        setCourses(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]); // Set as empty array to avoid issues
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Course List</h1>
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map(course => (
          <div key={course.id}>
            <h2>{course.title}</h2> {/* Ensure you use the correct property name */}
            <p>{course.description}</p>
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;
