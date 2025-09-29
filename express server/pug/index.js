const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const products = ['oven', 'microwave', 'refrigerator', 'washing machine', 'dishwasher'];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/fruits', (req, res) => {
    res.render('sample', {'heading' : 'Buy fruits', 'prod' : fruits})
})

app.get('/products', (req, res) => {
    res.render('sample', {'heading' : 'Buy products', 'prod' : products})
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
