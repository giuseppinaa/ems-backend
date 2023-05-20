const { Sequelize } = require('sequelize');
const seedData = require('./seed.json');

// change to postgres
const sequelize = new Sequelize('postgres://vfhwysev:psUIhMmwzB3VOgh7twQT0e-nY2FNl6yV@drona.db.elephantsql.com/vfhwysev');

// employee model
const Employee = sequelize.define('employee', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//
const Task = sequelize.define('task', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  priority: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

// Define the relationship between Task and Employee
Task.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Task, { foreignKey: 'employee_id' });

sequelize.authenticate().then(() => {
  sequelize
    .sync({ force: true })
    .then(async () => {
      console.log('Connection has been established successfully, bulk inserting records...');

      await Employee.bulkCreate(seedData.employees);
      await Task.bulkCreate(seedData.tasks);
      console.log('Bulk insertion successful');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
});

module.exports = { Task, Employee };