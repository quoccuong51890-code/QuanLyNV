DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE employee_management;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    fullname VARCHAR(100) NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('employee','manager')
    DEFAULT 'employee',

    remaining_leave INT DEFAULT 12,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE attendance (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    date DATE NOT NULL,

    check_in TIME,

    check_out TIME,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);

CREATE TABLE leave_requests (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    reason TEXT,

    status ENUM(
        'Pending',
        'Approved',
        'Rejected'
    ) DEFAULT 'Pending',

    note TEXT,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);
