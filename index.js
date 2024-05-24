const inquirer = require('inquirer')
const DB = require('./db/db')
const database = new DB()

function questions() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View all departments',
                value: 'viewAllDept'
            },
            {
                name: 'View all roles',
                value: 'viewAllRoles'
            },
            {
                name: 'View all employees',
                value: 'viewAllEmployees'
            },
            {
                name: 'Add employee',
                value: 'addEmployee'
            },
            {
                name: 'Add department',
                value: 'addDept'
            },
            {
                name: 'Add new role',
                value: 'newRole'
            },
            {
                name: 'Update employee role',
                value: 'updateEmployeeRole'
            },
        ]
    }).then((res) => {
        let choice = res.choice;

        switch (choice) {
            case 'viewAllDept':
                viewAllDept();
                break;
            case 'viewAllRoles':
                viewAllRoles();
                break;
            case 'viewAllEmployees':
                viewAllEmployees();
                break;
            case 'addEmployee':
                promptToAddEmployee();
                break;
            case 'addDept':
                promptToAddDept();
                break;
            case 'newRole':
                promptToAddNewRole();
                break;
            case 'updateEmployeeRole':
                updateEmployeeRole();
                break;
        }
    });
}

//View all dept
function viewAllDept() {
    database.viewDepartment()
        .then(({ rows }) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => questions());
}

//view all roles
function viewAllRoles() {
    database.viewRoles()
        .then(({ rows }) => {
            let viewRoles = rows;
            console.log('\n');
            console.table(viewRoles);
        })
        .then(() => questions());
}

//view all employees
function viewAllEmployees() {
    database.viewEmployees()
        .then(({ rows }) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => questions());
}

function promptToAddDept() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'deptName',
            message: 'Add new department'
        }
    ]).then((response) => {
        const { deptName } = response
        database.addDept(deptName)
            .then(() => questions())
    })
}

function promptToAddEmployee() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'firstName',
            message: 'Add employee first name'
        },
        {
            type: 'text',
            name: 'lastName',
            message: 'Add employee last name'
        },
        {
            type: 'text',
            name: 'role',
            message: 'Enter employee role'
        },
        {
            type: 'text',
            name: 'manager',
            message: 'Add manager name'
        }
    ]).then((response) => {
        const { firstName, lastName, role, manager } = response
        database.addEmployee(firstName, lastName, role, manager)
            .then(() => questions())
    })
}

function promptToAddNewRole() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'roleTitle',
            message: 'Enter the title for this role'
        },
        {
            type: 'text',
            name: 'roleDept',
            message: 'What department does this role belong to ?'
        },
        {
            type: 'text',
            name: 'roleSalary',
            message: 'Enter the salary for this role'
        }
    ]).then((response) => {
        const { roleTitle, roleDept, roleSalary } = response
        database.addRole(roleTitle, roleDept, roleSalary)
            .then(() => questions())
    })
}

function updateEmployeeRole() {
    database.viewEmployees()
        .then(({ rows }) => {
            let employeeList = rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select employee to change role',
                    choices: employeeList
                },
                {
                    type: 'text',
                    name: 'newRole',
                    message: 'Enter new role'
                }
            ]).then((response) => {
                const { newRole, employeeId } = response
                database.updateRole(newRole, employeeId)
                    .then(() => {
                        questions()
                    })
            })
        })
}
questions()