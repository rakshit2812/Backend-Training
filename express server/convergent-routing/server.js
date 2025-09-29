const express = require('express');
const app = express();
const yatriRoutes = require('./yatri');


//code block for logging the requests
//generally used for local API testing
const morgan = require('morgan');
const {createWriteStream} = require('fs');
const { join } = require('path');

const logFile = join(__dirname, 'yatri.log');

app.use(morgan(":method - :url - :date - :response-time ms"));  // morgan template
app.use(
  morgan(":method -:url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);


app.set('view engine', 'pug');
app.set('views', './views');

app.use('/student', yatriRoutes);
app.use('/professor', yatriRoutes);
app.use('/employee', yatriRoutes);

app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/welcome', (req, res) => {
    res.render('welcome');
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});