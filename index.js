const{ prompt }= require('inquirer');
const logo = require("asciiart-logo");
const db = require("./database");

init().run();
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  loadPrompts();
}

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
    { name: "View All Employees",
      value: "VIEW_EMPLOYEES"
    },
    { name: "View All Employees By Department",
      value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    },
    { name: "View All Employees By Manager",
      value: "VIEW_EMPLOYEES_BY_MANAGER"
    },
    { name: "Add Employee",
      value: "ADD_EMPLOYEE"
    },
    { name: "Remove Employee",
      value: "REMOVE_EMPLOYEE"
    },
    { name: "Update Employee Role",
      value: "UPDATE_EMPLOYEE_ROLE"
    },
    { name: "Update Employee Manager",
      value: "UPDATE_EMPLOYEE_MANAGER"
    },
    { name: "View All Roles",
      value: "VIEW_ROLES"
    },
    { name: "Add Role",
      value: "ADD_ROLE"
    },
    { name: "Remove Role",
      value: "REMOVE_ROLE"
    },
    { name: "View All Departments",
      value: "VIEW_DEPARTMENTS"
    },
    { name: "Add Department",
      value: "ADD_DEPARTMENT"
    },
    { name: "Remove Department",
      value: "REMOVE_DEPARTMENT"
    },
    { name: "View Total Utilized Budget By Department",
      value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
    },
    { name: "Quit",
      value: "QUIT"
    }
    ]
  }
]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "View_Managers":
        viewManagers();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_BUDGET":
        viewBudget();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }})}

function viewEmployees() {
  db.findEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadPrompts());
}

function removeEmployee() {
db.findEmployees()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
  })
);
prompt([
  {
    type: "list",
    name: "employeeId",
    message: "Which employee do you want to remove?",
    choices: employeeChoices
  }
])
  .then(res => db.removeEmployee(res.employeeId))
  .then(() => console.log("Removed employee from the database"))
  .then(() => loadPrompts())
  })
}
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadPrompts());
}
function viewManagers() {
db.findEmployees()
  .then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
}));

prompt([
  {
    type: "list",
    name: "managerId",
    message: "Which employee do you want to see direct reports for?",
    choices: managerChoices
  }
])
  .then(res => db.findManagers(res.managerId))
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
    } else {
    console.table(employees);
  }
})
  .then(() => loadPrompts())
});
}
function addRole() {
  db.findDepartments()
  .then(([rows]) => {
  let departments = rows;
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
}));
prompt([
  {
    name: "title",
    message: "What is the name of the role?"
  },
  {
    name: "salary",
    message: "What is the salary of the role?"
  },
  {
    type: "list",
    name: "department_id",
    message: "Which department does the role belong to?",
    choices: departmentChoices
  }
])
  .then(role => {
  db.createRole(role)
  .then(() => console.log(`Added ${role.title} to the database`))
  .then(() => loadPrompts())
    })
  })
}
function removeRole() {
db.findRoles()
  .then(([rows]) => {
  let roles = rows;
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  })
);
  prompt([
    {
      type: "list",
      name: "roleId",
      message:"Which role do you want to remove? (Warning: This will also remove employees)",
      choices: roleChoices
    }
])
    .then(res => db.removeRole(res.roleId))
    .then(() => console.log("Removed role from the database"))
    .then(() => loadPrompts())
  })
}
function viewDepartments() {
  db.findDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadPrompts());
}
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?"
  }
])
  .then(res => {
      let name = res;
      db.addDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => loadPrompts())
  })
}

function removeDepartment() {
db.findDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
  })
);
  prompt({
    type: "list",
    name: "departmentId",
    message:"Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
})
  .then(res => db.deleteDepartment(res.departmentId))
  .then(() => console.log(`Removed department from the database`))
  .then(() => loadPrompts())
  })
}
function viewBudget() {
  db.viewBudgets()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadPrompts());
}
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }])
  .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
  prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
        })
  .then(res => {
    let roleId = res.roleId;

    db.findEmployees()
      .then(([rows]) => {
        let employees = rows;
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,value: id
    })
);
managerChoices.unshift({ name: "None", value: null });
prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices
})
.then(res => {
  let employee = {
    manager_id: res.managerId,
    role_id: roleId,
    first_name: firstName,
    last_name: lastName
  }

  db.createEmployee(employee);
})
  .then(() => console.log(`Added ${firstName} ${lastName} to the database`
))
  .then(() => loadPrompts())
        })
      })
    })
  })
}
function quit() {
  console.log("Goodbye!");
  process.exit();
}
