### README.md

# My App

This project is a Node.js REST API built with Express and TypeScript. It includes user account creation, authentication, and profile information retrieval. It uses MySQL as the database.

## Prerequisites

- Node.js (v14.x or later)
- MySQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ahmedkarm310501/yay-task.git
   cd yay-task
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=task_db
   JWT_SECRET=secret
   ```

## Database Setup

1. **Create the database and tables:**

   Ensure your MySQL server is running, then run the `db.sql` script to create the database and tables.

   ```bash
   mysql -u root -p < db.sql
   ```

   You will be prompted to enter your MySQL root password.

   The `db.sql` file should contain:

   ```sql
   -- Create the database
   CREATE DATABASE task_db;

   -- Use the database
   USE task_db;

   -- Create the user table
   CREATE TABLE user (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       firstName VARCHAR(255) NOT NULL,
       lastName VARCHAR(255) NOT NULL
   );

   -- Create the user_connect table
   CREATE TABLE user_connect (
       id INT AUTO_INCREMENT PRIMARY KEY,
       id_user INT NOT NULL,
       connect_date DATETIME NOT NULL,
       ip VARCHAR(45) NOT NULL,
       FOREIGN KEY (id_user) REFERENCES user(id)
   );
   ```

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable in your `.env` file.

## API Endpoints

### 1. Create Account

- **URL:** `/api/users/create-account`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "john_doe",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "message": "User created successfully"
  }
  ```

### 2. Authenticate

- **URL:** `/api/users/authenticate`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "message": "Authentication successful",
    "data": {
      "token": "your_jwt_token"
    }
  }
  ```

### 3. Get Profile Information

- **URL:** `/api/users/profile`
- **Method:** `GET`
- **Headers:**

  ```http
  Authorization: Bearer your_jwt_token
  ```

- **Response:**

  ```json
  {
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
      "user": {
        "id": 1,
        "username": "john_doe",
        "firstName": "John",
        "lastName": "Doe"
      },
      "connections": [
        {
          "id": 1,
          "id_user": 1,
          "connect_date": "2024-07-10T12:00:00.000Z",
          "ip": "127.0.0.1"
        }
      ]
    }
  }
  ```

