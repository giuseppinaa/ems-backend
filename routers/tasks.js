// Purpose: to handle all routes for the "tasks" resource
const taskRouter = require('express').Router();
// import the Task model
const { Task } = require('../database/db');

// this router is nested inside the "tasks" route so
// any paths here are really "tasks/..."

// GET all tasks
taskRouter.get('/', async (req, res) => {
	try {
		console.log('GET tasks/');
		const tasks = await Task.findAll();
		console.log('>> tasks data:', tasks);
		res.status(200).json({ err: null, data: tasks });
	} catch (err) {
		console.log(`>> GET tasks`, err);
		res.status(500).json({ err, data: null });
	}
});

// GET a single task by id, including associated employee
taskRouter.get('/:id', async (req, res) => {
	try {
		console.log('GET tasks/:id');
		const { id } = req.params;
		const task = await Task.findOne({
			where: { id },
			include: 'employee',
		});
		console.log('>> task data:', task);
		res.status(200).json({ err: null, data: task });
	} catch (err) {
		console.log(`>> GET tasks/:id`, err);
		res.status(500).json({ err, data: null });
	}
});

// POST create task
taskRouter.post('/', async (req, res) => {
	try {
		console.log('POST tasks/');
		const newTask = req.body;
		// create new task
		const task = await Task.create(newTask);
		console.log('>> new task data:', task);
		res.status(200).json({ err: null, data: task });
	} catch (err) {
		console.log(`>> POST tasks/`, err);
		res.status(500).json({ err, data: null });
	}
});

// PUT update task
taskRouter.put('/:id', async (req, res) => {
	try {
		console.log('PUT tasks/:id');
		const { id } = req.params;
		const updatedTask = req.body;
		// find task by id and update
		await Task.update(updatedTask, {
			where: { id },
		});
		// get updated task
		const task = await Task.findOne({
			where: { id },
		});
		console.log('>> updated task data:', task);
		res.status(200).json({ err: null, data: task });
	} catch (err) {
		console.log(`>> PUT tasks/:id`, err);
		res.status(500).json({ err, data: null });
	}
});

// DELETE task
taskRouter.delete('/:id', async (req, res) => {
	try {
		console.log('DELETE tasks/:id');
		const { id } = req.params;
		// find task by id and delete
		await Task.destroy({
			where: { id },
		});
		res.status(200).json({ err: null, data: `Task ${id} deleted` });
	} catch (err) {
		console.log(`>> DELETE tasks/:id`, err);
		res.status(500).json({ err, data: null });
	}
});

module.exports = taskRouter;
