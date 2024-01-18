const express = require('express');
const mongoose = require('mongoose');
const user = require('./user.handler')
const app = express()
const port = 3000
require('dotenv').config()
const mongoURI = process.env.MONGODB_CREDENTIALS;

app.use(express.json())
app.use(express.static((__dirname + '/app')))

mongoose.connect(mongoURI);

app.get('/users/', user.list);
app.post('/users/', user.create);
app.get('/users/:id', user.get);
app.put('/users/:id', user.update);
app.patch('/users/:id', user.update);
app.delete('/users/:id', user.destroy);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe');
})

app.listen(port, () => {
    console.log('Arrancando la aplicación');
});