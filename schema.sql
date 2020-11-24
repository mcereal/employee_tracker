DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE job_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),

  FOREIGN KEY(role_id)
  REFERENCES job_role(id),

  FOREIGN KEY(manager_id)
  REFERENCES employee(id)
);

INSERT INTO department (department_name)
VALUES ('Sales')

INSERT INTO job_role (title, salary)
VALUES('Sales person', 60000.00)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('michael', 'curtis', 1, 1)