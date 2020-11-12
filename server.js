require('dotenv').config();
const express = require('express');

const app = express();

// Set up CORS
const cors = require('cors');
app.use(cors());

// Set up Morgan
const logger = require('morgan');
app.use(logger('dev'));

app.use(express.json());

// Initalize MongoDB
const initializeDB = require('./config/db.config');
const db = initializeDB();

// Set up API routes
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const schoolsRouter = require('./routes/schools.routes');
const clubsRouter = require('./routes/clubs.routes');

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/schools', schoolsRouter);
app.use('/api/clubs', clubsRouter);

// Run server on port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
