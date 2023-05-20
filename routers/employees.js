// this router is nested inside the "employees" route so
// any paths here are really "employees/..."
const employeesRouter = require('express').Router();

// import the Employee model
const { Employee } = require('../database/db');

// GET all employees
employeesRouter.get('/', async (req, res) => {
	try {
		console.log('GET all employees');
		let emp = await Employee.findAll();
		console.log('>> Employee data:', emp);
		res.status(200).json({ err: null, data: emp });
	} catch (err) {
		console.log(`>> GET all employees err`, err);
		res.status(500).json({ err, data: null });
	}
});

// GET single employee
employeesRouter.get('/:id', async (req, res) => {
	try {
		console.log('GET single employee');
		const employeeId = req.params.id;
		// get employee with tasks
		const employeeWithTasks = await Employee.findOne({
			where: {
				id: employeeId,
			},
			include: 'tasks',
		});
		res.status(200).json({ err: null, data: employeeWithTasks });
	} catch (err) {
		console.log('>> GET single empployee err', err);
		res.status(500).json({ err, data: null });
	}
});

// POST create new employee
employeesRouter.post('/create', async (req, res) => {
	try {
		console.log('POST employee/create');
		const newEmployee = await Employee.create(req.body);
		console.log('>> New employee data:', newEmployee);
		res.status(200).json({ err: null, data: newEmployee });
	} catch (err) {
		console.log(`>> POST create employee error`, err);
		res.status(500).json({ err, data: null });
	}
});

// PUT update employee
employeesRouter.put('/:id', async (req, res) => {
	try {
		console.log('PUT edit employee');
		const employeeId = req.params.id;
		const updatedEmployee = req.body;
		// find employee by id and update
		await Employee.update(updatedEmployee, {
			where: {
				id: employeeId,
			},
			returning: true,
		});
		// get updated employee
		const employeeUpdated = await Employee.findOne({
			where: {
				id: employeeId,
			},
			include: 'tasks',
		});
		res.status(200).json({ err: null, data: employeeUpdated });
	} catch (err) {
		console.log('>> PUT update employee err', err);
		res.status(500).json({ err, data: null });
	}
});

// DELETE employee
employeesRouter.delete('/:id', async (req, res) => {
	try {
		console.log('DELETE employee');
		const employeeId = req.params.id;
		// find employee by id and delete
		await Employee.destroy({
			where: {
				id: employeeId,
			},
		});
		res.status(200).json({ err: null, data: `Employee ${employeeId} deleted` });
	} catch (err) {
		console.log('>> DELETE employee err', err);
		res.status(500).json({ err, data: null });
	}
});

module.exports = employeesRouter;
