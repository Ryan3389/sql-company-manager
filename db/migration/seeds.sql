INSERT INTO department (department_name)
VALUES 
('Marketing'),
('Sales'),
('Finance'),
('Engineering');

INSERT INTO role (department_id, title, salary)
VALUES 
(1, 'Marketing Coordinator', 50000),
(2, 'Sales Lead', 75000),
(3, 'Finance Manager', 80000),
(4, 'Software Engineer', 120000);

INSERT INTO employee (role_id, first_name, last_name)
VALUES 
(1, 'Bob', 'Smith'),
(2, 'John', 'Doe'),
(3, 'Oliver', 'Martinez'),
(4, 'Noah', 'Santos');
