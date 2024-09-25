// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const cors = require('cors');


const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/job', userRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
