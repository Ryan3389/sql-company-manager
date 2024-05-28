//Install inquirer, import db.js 
const inquirer = require('inquirer');
const DB = require('./db/db');
const database = new DB()


//Questions related to database
//.then uses switch statement to determine which function to call to alter database
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

//View all departments
//Extract department data
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
//Extract role data
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
//Extract all employee data
function viewAllEmployees() {
    database.viewEmployees()
        .then(({ rows }) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => questions());
}


//Uses inquirer to ask which dept to add
//uses .then to pass in this new data into the addDept method to pass the correct sql query
function promptToAddDept() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'deptName',
            message: 'Add new department'
        }
    ]).then((response) => {
        const { deptName } = response;
        database.addDept(deptName)
            .then(() => {
                console.log('Department added successfully!');
                questions();
            })
            .catch((error) => {
                console.error('Error adding department:', error);
                questions();
            });
    });
}
// Add new employee functions
//Uses inquirer to enter name, role and manager
//Uses this new data to pass into addEmployee method to pass the correct sql query
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
            message: 'Enter role id'
        },
        {
            type: 'text',
            name: 'manager',
            message: 'Add manager name'
        }
    ]).then((response) => {
        const { firstName, lastName, role, manager } = response
        database.addEmployee(firstName, lastName, role, manager)
            .then(() => {
                console.log('Employee successfully added')
                questions();
            })
            .catch((error) => {
                console.error('Error in adding employee', error)
                questions();
            });
    });
}

//Uses inquirer to ask a series of questions to add role title, department, and salary
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
            message: 'Enter department id'
        },
        {
            type: 'text',
            name: 'roleSalary',
            message: 'Enter the salary for this role'
        }
    ]).then((response) => {
        const { roleTitle, roleDept, roleSalary } = response
        database.addRole(roleTitle, roleDept, roleSalary)
            .then(() => {
                console.log('Role added successfully!')
                questions();
            })
            .catch((error) => {
                console.error('Error adding role:', error)
                questions()
            });
    });
}




//update employee role
function updateEmployeeRole() {
    //Get a list of every employee
    database.viewEmployees()
        .then(({ rows }) => {
            let employees = rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));

            //Use inquirer to select which employee to alter
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select an employee to update their role:',
                    choices: employees
                },
                {
                    type: 'text',
                    name: 'newRole',
                    message: 'Enter new role id:'
                }
            ]).then((response) => {
                const { employeeId, newRole } = response;

                //Update the new employee role in database
                database.updateRole(newRole, employeeId)
                    .then(() => {
                        console.log('Employee role updated successfully!');
                        questions();
                    })
                    .catch((error) => {
                        console.error('Error updating employee role:', error);
                        questions();
                    });
            });
        })

}









questions()

