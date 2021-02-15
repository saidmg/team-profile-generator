const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

let employees =[]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function askAboutTheTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What type of employee would you like to add?",
          choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        }
      ])
      .then(val => {
        // If the user says yes , add another member again, otherwise stop
        if (val.role === "Manager") {
          managerInfo();
        } else if (val.role === "Engineer"){
            engineerInfo();
        }
        else{
            internInfo();
        }
      });
  }

  function managerInfo(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Manager's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?",
      }
    ])
    .then(val => {
        const manager = new Manager(val.name, val.id, val.email, val.officeNumber)
        console.log(manager)

        employees.push(manager)
        moreEmployees()
    });
  }
  function engineerInfo(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Engineer's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub username?",
      }
    ])
    .then(val => {
        const engineer = new Engineer(val.name, val.id, val.email, val.github)
        console.log(engineer)
        employees.push(engineer)
        moreEmployees()
    });
  }

  function internInfo(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Intern's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "What is the Intern's school name?",
      }
    ])
    .then(val => {
        const intern = new Intern(val.name, val.id, val.email, val.school)
        console.log(intern)

        employees.push(intern)
        moreEmployees()
    });
  }

 function moreEmployees(){
    inquirer
    .prompt([
      {
        type: "confirm",
        name: "choice",
        message: "Add another employee"
      }
    ])
    .then(val => {
      if (val.choice) {
        askAboutTheTeam();
      } else {
        quit();
      }
    });
  }

  async function quit() {
    console.log("\nCreating Your HTML File");
    
    const rendering = await render(employees)
    await writeFileAsync(outputPath,rendering)
    console.log("done! File was Created")

  }


async function init(){
    try{
        
        const response = await askAboutTheTeam();  
       
        console.log("Success!")
    }
    catch(err){
        console.log(err)
    }
}
// Function call to initialize app
init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
