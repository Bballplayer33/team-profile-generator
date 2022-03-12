// Added const
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "");
const render = require("./lib/createHTML");

let employeeArray = [];


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

    //added emplotee roles    
function employeeByRole(response){
       // console.log(response)
    if(response["Employee-Role"] == "Intern"){
        return inquirer.prompt(
            {
                type: "input",
                message: "School:",
                name: "school"
            }
        )
    }
    else if(response["Employee-Role"]  == "Engineer"){
        return inquirer.prompt(
            {
                type:"input",
                message:"GitHub:",
                name:"github"
            }
        )
    }
}

//loop to see if you want to add more
function finishEmployees(){
    return inquirer.prompt(
        {
            type: "confirm",
            message: "Do you want to make another Employee?",
            name: "continue"
        }
    )
} 

//creates function for create employee

createEmployee().then(response =>{

    createManager().then(managerAnswer =>{
        const {name, id , email} = response
        const manager = new Manager(name, id, email, managerAnswer.office)
        employeeArray.push(manager)
        newEmployees()

        function newEmployees(){
        employeeType().then(EmployeeType =>{

            createEmployee().then(Employeeinfo =>{

                employeeByRole(EmployeeType).then(data =>{
                    console.log(data)
                    const {name, id, email} = Employeeinfo
                    switch(EmployeeType["Employee-Role"]){
                        case "Intern": 
                        const intern = new Intern(name, id, email, data.school)
                        employeeArray.push(intern)
                        break;

                        case "Engineer": 
                        const engineer = new Engineer(name, id, email, data.github)
                        employeeArray.push(engineer)
                        break;
                    }

                   finishEmployees().then(promptAnswer =>{
                       if(promptAnswer.continue){
                           newEmployees()
                       }
                       else{
                            const html = render(employeeArray)
                            fs.writeFile("", html, err =>{
                                if(err) throw err
                            })
                       }
                   })
                })
            })
        })
    }
    })
})