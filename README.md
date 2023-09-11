# Backend App with Node.js, Express, JWT, and ObjectsToCsv

This README provides an overview of a backend application built using Node.js and Express, which incorporates JWT (JSON Web Tokens) for authentication and ObjectsToCsv for CSV file generation. The application exposes several API routes to manage students, interviews, and CSV file generation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Routes](#api-routes)
  - [Home](#home)
  - [Add Student](#add-student)
  - [Add Interview](#add-interview)
  - [View Student](#view-student)
  - [View Interview](#view-interview)
  - [Assign Interview](#assign-interview)
  - [Download CSV](#download-csv)

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is usually installed along with Node.js.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github/Alok515/placementor
   ```

2. Navigate to the project directory:

   ```bash
   cd placementor
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:

   Create a `.env` file in the project root directory and define the following variables:

   ```env
   PORT=3000
   JWT_SECRET=your-secret-key
   ```

   Replace `your-secret-key` with a strong, random secret key for JWT authentication.

5. Start the application:

   ```bash
   npm start
   ```

   The application will start on the specified port (default is 3000).

## Authentication

This application uses JWT for authentication. To access protected routes, include a JWT token in the `Authorization` header of your HTTP requests. Use the `/login` route to obtain a JWT token by providing valid credentials.

## API Routes

### Home

- **URL:** `/`
- **Method:** GET
- **Description:** The default route to check if the server is running.

### Add Student

- **URL:** `/addstudent`
- **Method:** POST
- **Description:** Add a new student to the system.

### Add Interview

- **URL:** `/addinterview`
- **Method:** POST
- **Description:** Add a new interview record to the system.

### View Student

- **URL:** `/viewstudent/:studentId`
- **Method:** GET
- **Description:** View details of a specific student by providing their ID.

### View Interview

- **URL:** `/viewinterview/:interviewId`
- **Method:** GET
- **Description:** View details of a specific interview by providing its ID.

### Assign Interview

- **URL:** `/assigninterview/:studentId/:interviewId`
- **Method:** POST
- **Description:** Assign an interview to a specific student by providing both the student ID and interview ID.

### Download CSV

- **URL:** `/downloadcsv`
- **Method:** GET
- **Description:** Generate and download a CSV file containing data from the system.

Make sure to include the appropriate request data and authentication token when accessing these routes.

You can customize the behavior and functionality of these routes by editing the code in the Express application's route handlers.

Feel free to expand upon this README to include additional information about the application, its usage, and any further instructions for deployment or customization.
