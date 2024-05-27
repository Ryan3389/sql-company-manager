const pool = require('./connection')

class DB {
    constructor() { }

    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } catch (err) {
            console.error(err);
        } finally {
            client.release();
        }
    }



    // View all departments
    viewDepartment() {
        return this.query('SELECT * FROM department');
    }

    // View all roles
    viewRoles() {
        return this.query(`
    SELECT 
    role.id AS role_id,
    role.title AS job_title,
    role.salary,
    department.department_name AS department
    FROM 
    role
    INNER JOIN
    department ON role.department_id = department.id
    `)
    }

    // View all employees
    viewEmployees() {
        return this.query(`
    SELECT 
    employee.id AS employee_id,
    employee.first_name,
    employee.last_name,
    role.title AS job_title,
    department.department_name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM 
      employee
    INNER JOIN 
      role ON employee.role_id = role.id
    INNER JOIN 
      department ON role.department_id = department.id
    LEFT JOIN 
      employee AS manager ON employee.manager_id = manager.id
    `);
    }

    // Add new employee
    addEmployee(firstName, lastName, role, manager) {
        return this.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, role, manager]);
    }

    // Add new role
    addRole(title, dept, salary) {
        return this.query('INSERT INTO role (title, department_id, salary) VALUES ($1, $2, $3)', [title, dept, salary])

    }
    updateRole(title, id) {
        return this.query('UPDATE role SET title = $1 WHERE id = $2', [title, id]);
    }

    // Add new department
    addDept(deptName) {
        return this.query('INSERT INTO department (department_name) VALUES ($1)', [deptName]);
    }


}

module.exports = DB;