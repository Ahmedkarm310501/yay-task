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
