DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee(
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    manager_id int
);

CREATE TABLE role(
    id int not null auto_increment primary key,
    title varchar(30),
    salary int,
    department_id int
);

CREATE TABLE department(
    id int not null auto_increment primary key,
    name varchar(30)
);