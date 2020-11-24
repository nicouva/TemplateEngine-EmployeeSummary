const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employee = []

const addNewEmployee = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'role',
    message: 'Which employee are you adding?',
    choices: ['Manager', 'Engineer', 'Intern']
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the employee?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the id number?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the email address?'
  }])
    .then((employee) => {
      switch (employee.role) {
        case 'Manager':
          addManager(employee)
          break
        case 'Engineer':
          addEngineer(employee)
          break
        case 'Intern':
          addIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

const addManager = ({ name, id, email }) => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the office number for the manager?'
    }
  )
    .then(({ officeNumber }) => {
      employee.push(new Manager(name, id, email, officeNumber))
      next()
    })
    .catch(err => console.log(err))
}

const addEngineer = ({ name, id, email }) => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'github',
      message: 'What is the GitHub username?'
    }
  )
    .then(({ github }) => {
      employee.push(new Engineer(name, id, email, github))
      next()
    })
    .catch(err => console.log(err))
}

const addIntern = ({ name, id, email }) => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'school',
      message: 'What is the school name?'
    }
  )
    .then(({ school }) => {
      employee.push(new Intern(name, id, email, school))
      next()
    })
    .catch(err => console.log(err))
}

const next = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'choice',
      message: 'Would you like to add another employee?',
      choices: ['Add another employee', 'Finish']
    })
    .then(({ choice }) => {
      switch (choice) {
        case 'Add another employee':
          addNewEmployee()
          break
        case 'Finish':
          fs.writeFile(path.join(__dirname, 'output', 'main.html'),
            render(employee), err => {
              if (err) { console.log(err) }
            })
          break
      }
    })
    .catch(err => console.log(err))
}

addNewEmployee()