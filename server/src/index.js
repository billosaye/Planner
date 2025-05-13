require('./temp-env');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes); //This line mounts the taskRoutes at the /api path.


app.get('/', (req, res) => {
  res.send('TODO App Backend');
});

app.use(errorHandler); //This line uses the errorHandler middleware to handle errors.

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});









