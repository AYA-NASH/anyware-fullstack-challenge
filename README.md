# Anyware Fullstack Challenge

This repository contains my solution for the Anyware Software Technical Assessment Challenge. The project is a full-stack web application designed to demonstrate proficiency in building robust and scalable applications.

## Project Overview

This application serves as a foundational platform, simulating core functionalities typically found in a course management or educational portal. It focuses on user authentication, routing, and displaying dashboard-like content. The project is built with a React frontend, a Node.js/Express backend, and utilizes Redux for state management, providing a clear separation of concerns and a maintainable architecture.

## Features Implemented

* **User Authentication:** User login and logout functionality.
* **Protected Routes:** Unauthenticated users are redirected to the login page when attempting to access protected content (e.g., `/dashboard`).
* **Routing:** Handles navigation between public (`/login`) and authenticated (`/dashboard`) routes. Unknown routes are gracefully redirected.
* **Dashboard View:** Displays sample content for "Announcements" and "What's Due" sections upon successful authentication.
* **Redux State Management:** Manages authentication state (`authorized`) and notifications.
* **API Integration:** Connects the React frontend with a basic Node.js/Express backend.
* **Responsive UI:** Designed to be functional across different screen sizes.
* **Comprehensive Testing:** Includes unit tests for Redux slices and React components, ensuring reliability and maintainability.

## Technologies Used

### Frontend (React)

* **React:** A JavaScript library for building user interfaces.
* **React Router DOM:** For declarative routing in React applications.
* **Redux Toolkit:** Official, opinionated, batteries-included toolset for efficient Redux development.
* **React Redux:** React bindings for Redux.
* **MUI (Material-UI):** A popular React UI framework for a polished and consistent design.
* **Vite:** A fast frontend build tool.
* **Jest & React Testing Library:** For unit and integration testing of React components and Redux logic.
* **TypeScript:** For type safety and improved developer experience.

### Backend (Node.js/Express)

* **Node.js:** JavaScript runtime.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* **dotenv:** For loading environment variables.
* **Nodemon:** Utility that automatically restarts the node application when file changes are detected.

## How to Run the Project
### 1. Clone the Repository
### 2. Backend Setup:
```
cd anyware-fullstack-challenge/backend
npm install
npm run dev
```
The backend server will typically run on http://localhost:5000 (or the port specified in your .env file).

### 3. Frontend Setup
```
cd anyware-fullstack-challenge/frontend-react
npm install
npm run dev
```
The frontend application will typically open in your browser at http://localhost:5173 (or another available port).

### 4. Frontend Testing:
To run the frontend tests:
```
cd frontend-react
npm test 
```
## Video Demonstration
[Video Link](https://drive.google.com/file/d/1F18vS8NTL2V8sXaLHtUaK31Qb9vdwILW/view?usp=sharing)

## Potential Enhancements
- **Internationalization (i18n)**: Implement i18next.
- **User Management**: Extend the backend and frontend to include full CRUD (Create, Read, Update, Delete) operations for users, with different roles (e.g., Student, Professor, Admin).
- **Course Management**: Introduce functionalities to add, edit, view, and assign courses to students/professors.
- **Assignment/Quiz Functionality**: Develop modules for creating, submitting, and grading assignments and quizzes.
- **Advanced Authentication & Security**: Implement features like JWT (JSON Web Tokens) for authentication, role-based access control.
- **Error Handling & Logging**: Implement more comprehensive error handling and centralized logging for both frontend and backend.






