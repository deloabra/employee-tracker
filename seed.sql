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

INSERT INTO employee(first_name, last_name, role_id, manager_id)
values
("Brayden", "DeLoach", 1, null),
("Charlie", "DeLoach", 2, 1);

INSERT INTO role(title, salary, department_id)
values
("Student", 0, 1),
("Cat", 10000, 1);

INSERT INTO department(name)
values
("Temp");