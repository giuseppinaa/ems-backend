const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;

const employeesApi = require('./routers/employees');
const tasksApi = require('./routers/tasks');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/employees', employeesApi);
app.use('/tasks', tasksApi);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
