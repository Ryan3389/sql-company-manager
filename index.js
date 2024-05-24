const inquirer = require('inquirer');
const DB = require('./db');
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