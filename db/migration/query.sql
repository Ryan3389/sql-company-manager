SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;
