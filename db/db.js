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

}