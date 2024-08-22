# Project Documentation

## Overview
This project consists of a backend service and a frontend service, both of which are containerized using Docker. The backend is a Spring Boot application, and the frontend is a React application. This documentation provides steps to clone the project, build, and run it locally.

## Prerequisites
Before running the project locally, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Cloning the Repository
To get started, clone the project repository from GitHub.

```bash
git clone https://github.com/Apocalypse96/CourseManagement
cd CourseManagement
```

## Running the Project Locally

### 1. **Using Docker Compose**
The easiest way to run both the backend and frontend services is by using Docker Compose. The `docker-compose.yml` file is already configured to set up the necessary services.

1. **Start the Services:**
   From the project root directory, run the following command to start the backend and frontend services:

   ```bash
   docker-compose up -d
   ```

   This command will:
   - Pull the `internship_backend` and `internship_frontend` images from Docker Hub.
   - Start the backend service on port `6969`.
   - Start the frontend service on port `3000`.

2. **Accessing the Application:**
   - **Frontend**: Open your browser and navigate to `http://localhost:3000` to access the frontend.
   - **Backend**: The backend can be accessed via `http://localhost:6969`. If the H2 database console is enabled, it can be accessed at `http://localhost:6969/h2-console`.

3. **Stopping the Services:**
   To stop the services, run:

   ```bash
   docker-compose down
   ```

### 2. **Manually Running Containers**
If you prefer to run the backend and frontend containers manually without Docker Compose, follow these steps:

1. **Run the Backend Container:**

   ```bash
   docker run -d -p 6969:6969 --name backend \
     -e SPRING_PROFILES_ACTIVE=prod \
     -e SPRING_DATASOURCE_URL=jdbc:h2:file:/data/testdb;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE \
     -e SPRING_H2_CONSOLE_ENABLED=true \
     -e SPRING_H2_CONSOLE_PATH=/h2-console \
     -e SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS=true \
     -v $(pwd)/data:/data \
     apocalypse96/internship_backend:latest
   ```

2. **Run the Frontend Container:**

   ```bash
   docker run -d -p 3000:80 --name frontend --link backend:backend apocalypse96/internship_frontend:latest
   ```

3. **Access the Application**: 
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:6969](http://localhost:6969)
   - H2 Console: [http://localhost:6969/h2-console](http://localhost:6969/h2-console)

### 3. **Building and Pushing Docker Images**
If you make changes to the code and need to rebuild the Docker images:

1. **Build the Backend Image:**

   ```bash
   docker build -t apocalypse96/internship_backend:latest ./backend
   ```

2. **Build the Frontend Image:**

   ```bash
   docker build -t apocalypse96/internship_frontend:latest ./frontend
   ```

3. **Push Images to Docker Hub:**

   ```bash
   docker push apocalypse96/internship_backend:latest
   docker push apocalypse96/internship_frontend:latest
   ```

## Environment Variables
The following environment variables are used in the `docker-compose.yml` file for configuration:

- **Backend:**
  - `SPRING_PROFILES_ACTIVE`: Specifies the active profile (`prod` in this case).
  - `SPRING_DATASOURCE_URL`: JDBC URL for the H2 database.
  - `SPRING_H2_CONSOLE_ENABLED`: Enables the H2 console.
  - `SPRING_H2_CONSOLE_PATH`: Path to the H2 console.
  - `SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS`: Allows other computers to access the H2 console.


## Notes
- Ensure that Docker is running on your machine before executing the above commands.
- The data directory is mapped to the host machine to persist the H2 database data.


---

# **Courses API Documentation**

## **Overview**

The Courses API provides endpoints to manage courses and course instances. This documentation outlines the available endpoints, including request and response payloads, as well as expected HTTP status codes.

---

## **Base URL**

```
http://localhost:6969/api
```

---

## **Endpoints**

### **1. Courses Endpoints**

#### **1.1 Create a Course**

- **Endpoint**: `/courses`
- **Method**: `POST`
- **Description**: Creates a new course.
- **Request Payload**:

  ```json
  {
    "courseCode": "CS101",
    "title": "Introduction to Computer Science",
    "description": "A foundational course in computer science."
  }
  ```

- **Response Payload**:

  ```json
  {
    "id": 1,
    "courseCode": "CS101",
    "title": "Introduction to Computer Science",
    "description": "A foundational course in computer science.",
    "courseInstances": []
  }
  ```

- **Status Codes**:
  - `200 OK`: Course created successfully.
  - `400 Bad Request`: Invalid input.

#### **1.2 Get All Courses**

- **Endpoint**: `/courses`
- **Method**: `GET`
- **Description**: Retrieves a list of all courses.
- **Response Payload**:

  ```json
  [
    {
      "id": 1,
      "courseCode": "CS101",
      "title": "Introduction to Computer Science",
      "description": "A foundational course in computer science.",
      "courseInstances": []
    },
    {
      "id": 2,
      "courseCode": "CS102",
      "title": "Introduction to Computer Architecture",
      "description": "This course provides a basic introduction to the architecture and algorithms of computer systems.",
      "courseInstances": []
    }
  ]
  ```

- **Status Codes**:
  - `200 OK`: Successfully retrieved list of courses.

#### **1.3 Get a Course by ID**

- **Endpoint**: `/courses/{id}`
- **Method**: `GET`
- **Description**: Retrieves details of a specific course by its ID.
- **Response Payload**:

  ```json
  {
    "id": 1,
    "courseCode": "CS101",
    "title": "Introduction to Computer Science",
    "description": "A foundational course in computer science.",
    "courseInstances": []
  }
  ```

- **Status Codes**:
  - `200 OK`: Successfully retrieved the course.
  - `404 Not Found`: Course not found.

#### **1.4 Delete a Course**

- **Endpoint**: `/courses/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a course by its ID.
- **Response Payload**: None
- **Status Codes**:
  - `204 No Content`: Course deleted successfully.
  - `404 Not Found`: Course not found.

---

### **2. Course Instances Endpoints**

#### **2.1 Create a Course Instance**

- **Endpoint**: `/instances`
- **Method**: `POST`
- **Description**: Creates a new course instance.
- **Request Payload**:

  ```json
  {
    "deliveryYear": 2023,
    "semester": 1,
    "course": {
      "id": 1
    }
  }
  ```

- **Response Payload**:

  ```json
  {
    "id": 1,
    "deliveryYear": 2023,
    "semester": 1,
    "course": {
      "id": 1,
      "courseCode": "CS101",
      "title": "Introduction to Computer Science",
      "description": "A foundational course in computer science.",
      "courseInstances": []
    }
  }
  ```

- **Status Codes**:
  - `200 OK`: Course instance created successfully.
  - `400 Bad Request`: Invalid input.

#### **2.2 Get Course Instances by Year and Semester**

- **Endpoint**: `/instances/{year}/{semester}`
- **Method**: `GET`
- **Description**: Retrieves course instances for a specific delivery year and semester.
- **Response Payload**:

  ```json
  [
    {
      "id": 1,
      "deliveryYear": 2023,
      "semester": 1,
      "course": {
        "id": 1,
        "courseCode": "CS101",
        "title": "Introduction to Computer Science",
        "description": "A foundational course in computer science."
      }
    }
  ]
  ```

- **Status Codes**:
  - `200 OK`: Successfully retrieved list of course instances.
  - `404 Not Found`: No course instances found for the given year and semester.

#### **2.3 Get a Course Instance by ID**

- **Endpoint**: `/instances/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific course instance by its ID.
- **Response Payload**:

  ```json
  {
    "id": 1,
    "deliveryYear": 2023,
    "semester": 1,
    "course": {
      "id": 1,
      "courseCode": "CS101",
      "title": "Introduction to Computer Science",
      "description": "A foundational course in computer science."
    }
  }
  ```

- **Status Codes**:
  - `200 OK`: Successfully retrieved the course instance.
  - `404 Not Found`: Course instance not found.

#### **2.4 Delete a Course Instance**

- **Endpoint**: `/instances/{year}/{semester}/{courseId}`
- **Method**: `DELETE`
- **Description**: Deletes a course instance by year, semester, and course ID.
- **Response Payload**: None
- **Status Codes**:
  - `204 No Content`: Course instance deleted successfully.
  - `404 Not Found`: Course instance not found.

---

## **Error Handling**

The API includes global exception handling to return structured error responses.

- **Error Response Payload**:

  ```json
  {
    "status": "BAD_REQUEST",
    "errors": [
      "Error message 1",
      "Error message 2"
    ]
  }
  ```

- **Common HTTP Status Codes**:
  - `400 Bad Request`: The request was invalid or cannot be served.
  - `404 Not Found`: The requested resource could not be found.
  - `500 Internal Server Error`: An unexpected error occurred on the server.

---

## **Database**

The API uses an H2 in-memory database for development purposes, with data persistence handled through Docker volumes. The H2 console can be accessed at:

```
http://localhost:6969/h2-console
```

Use the following JDBC URL to connect to the H2 database:

```
jdbc:h2:file:/data/testdb
```

---
