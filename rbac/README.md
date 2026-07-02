# Role-Based Access Control (RBAC) Module

## Overview

The Role-Based Access Control (RBAC) module is developed as part of the User Login Pattern Analysis System. This module provides secure user authentication by validating login credentials against the PostgreSQL database through a FastAPI backend. It also records every login attempt for future analysis and auditing.

The frontend is developed using React.js and communicates with the FastAPI backend through REST APIs.

---

## Features

- User Login Authentication
- Password Verification using BCrypt
- Role-Based Access Control (RBAC) Structure
- Login Attempt Logging
- Login Success/Failure Tracking
- CAPTCHA Validation
- Password Visibility Toggle
- Responsive Login Interface
- PostgreSQL Database Integration
- FastAPI REST APIs

---

## Technology Stack

### Frontend

- React.js
- Axios
- Lucide React Icons
- HTML5
- CSS3

### Backend

- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Passlib (BCrypt)
- Pydantic

---

## Project Structure

```text
rbac/
│
├── Backend/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│ 
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## Backend Setup

Navigate to the Backend folder

```bash
cd Backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI Server

```bash
uvicorn main:app --reload
```

Backend URL

```text
http://127.0.0.1:8000
```

Swagger API Documentation

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install Dependencies

```bash
npm install
```

Start React Application

```bash
npm start
```

Frontend URL

```text
http://localhost:3000
```

---

## Database

Database Used

- PostgreSQL

Tables

### users

| Column | Description |
| --- | --- |
| uid | Primary Key |
| username | User Name |
| password_hash | Encrypted Password |
| is_active | User Status |

### user_login_logs

| Column | Description |
| --- | --- |
| log_id | Primary Key |
| username | Username |
| login_time | Login Timestamp |
| ip_address | Client IP |
| login_location | Login Location |
| device | Device Information |
| status | SUCCESS / FAILED |

---

## API Endpoints

### Check Backend

```http
GET /
```

Response

```json
{
  "message": "Backend Running Successfully"
}
```

---

### Login

```http
POST /login
```

Request

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Success Response

```json
{
  "status": "success",
  "message": "Login successful"
}
```

Error Response

```json
{
  "detail": "Invalid username or password"
}
```

---

## Login Flow

1. User enters username and password.
2. User completes CAPTCHA verification.
3. React frontend sends a POST request to FastAPI.
4. FastAPI validates credentials against PostgreSQL.
5. Password is verified using BCrypt.
6. Login attempt is recorded in `user_login_logs`.
7. Success or failure response is returned to the frontend.
8. Appropriate message is displayed to the user.

---

## Future Enhancements

- Complete RBAC implementation with multiple roles
- JWT Authentication
- Role-wise Dashboard
- Permission Management
- Session Management
- Audit Dashboard
- Login Analytics
- Multi-Factor Authentication (MFA)

---

## Author

Bangari Srijoshna
