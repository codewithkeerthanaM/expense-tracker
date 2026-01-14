# Expense Tracker Web Application

A full-stack Expense Tracker application that enables users to securely track and manage daily expenses with authentication and data visualization.

---

## Features

- User authentication (Register, Login, Logout)
- JWT-based protected routes
- Add and delete expenses
- Category-wise expense visualization using charts
- Automatic total expense calculation
- Dashboard-style user interface
- MongoDB database integration

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

---

## Project Structure
├── backend
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
│
├── frontend
│ ├── index.html (Dashboard)
│ ├── login.html (Login page)
│ ├── register.html (Register page)
│ ├── style.css (Styling)
│ ├── script.js (Expense logic)
│ └── auth.js (Authentication logic)
│
└── README.md

## Authentication Flow

1. User registers with email and password
2. User logs in and receives a JWT token
3. Token is stored in localStorage
4. Dashboard routes are protected using JWT
5. Logout clears the token and redirects to login

---

## Dashboard Overview

- Expense input form and expense list
- Category-wise expense chart
- Logout option in the dashboard header

Open frontend/login.html in a browser.