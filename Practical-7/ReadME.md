# Practical 7 — Central City Library Portal

## Aim
To develop a basic server-side web application using Node.js
and Express.js demonstrating request-response handling,
routing, session management, and authentication.

## Technologies Used
- Node.js
- Express.js
- express-session
- JavaScript
- HTML5
- CSS3

## Features
- Express server and request-response handling
- Home and About routes
- Login and Logout functionality
- Predefined Student and Staff credentials
- Session-based authentication
- Protected Dashboard
- Middleware for authentication and access control
- Redirect unauthenticated users to the Login page
- Invalid login error handling
- Responsive user interface

## Project Structure
- server.js — Express server and application routes
- public/style.css — Portal styling
- package.json — Project configuration
- package-lock.json — Dependency lock file

## Demo Credentials

Student:
- Username: student
- Password: student123

Staff:
- Username: staff
- Password: staff123

## How to Run
1. Open the Practical-7 folder in Visual Studio Code.
2. Install dependencies using `npm install`.
3. Start the application using `npm start`.
4. Open http://localhost:3000 in a browser.

## Testing
- Verified Home and About routes.
- Tested valid Student and Staff login.
- Tested invalid login credentials.
- Verified protected Dashboard access.
- Tested session persistence and Logout functionality.

## Note
This is an academic demonstration using predefined
credentials and in-memory session storage. It is not
intended for production authentication.