// Added const
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


function createEmployee(){
    return inquirer.prompt(
        [
        {
            type: "input",
            message: "Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Employee ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Email:",
            name:"email"
        }]
)}

//added  manager questions
function createManager(){
        return inquirer.prompt(
            {
                type:"input",
                message:"Office Number:",
                name:"office"  
            }
        )
}

// added emplyeed intern vs enginneer questions
function employeeType(){
        return inquirer.prompt(
        {type:"list",
        choices: ["Intern", "Engineer"],
        name: "Employee-Role"
        }
    )
    }