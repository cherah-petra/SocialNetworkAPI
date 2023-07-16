const express = require('express');
const db = require("./config/connection");
const routes = require('./routes');

const port = 3001; 
const app = express();

const moment = require('moment');


const dbURI = 'mongodb://localhost:27017';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
