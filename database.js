//JUST AN EXAMPLE
import MONGODB_CREDENTIALS from './apikey';
// Importa la bilbioteca de mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Conecta a la base de datos MongoDB utilizando la cadena de conexión proporcionada.
mongoose.connect(MONGODB_CREDENTIALS);

// Define un modelo de datos llamado 'User' utilizando mongoose.model.
// Este modelo tiene dos campos: 'username' de tipo String y 'edad' de tipo Number.
const User = mongoose.model('User', {
    username: String,
    edad: Number,
});

// Función para crear un nuevo usuario y guardarlo en la base de datos.
const crear = async () => {
    const user = new User({ username: 'Jose', edad: 21});
    const savedUser = await user.save();
    console.log(savedUser)
}
//crear();

// Función para encontrar y mostrar todos los usuarios de la base de datos.
const findAll = async () => {
    const users = await User.find()
    console.log(users);
}

//findAll();

// Función para encontrar usuarios utilizando datos especificos del usuario y mostrarlos.
const search = async () => {
    const user = await User.find({ username: 'Jose'})
    console.log(user)
}
//search();

// Función para encontrar usuarios utilizando datos especificos del usuario y mostrarlos.
const searchOne = async () => {
    const user = await User.findOne({ username: 'Juan'})
    console.log(user)
}
//searchOne();

// Función para actualizar datos del usuario en la base de datos.
const updateUserData = async () => {
    const user = await User.findOne({ username: 'Jose'})
    console.log(user)
    user.edad = 25
    await user.save()
    console.log(user)
}
//updateUserData();

// Función para eliminar usuarios de la base de datos.
const deleteUser = async () => {
    const user = await User.findOne({ username: 'Juan'})
    console.log(user)
    if (user) {
        await user.deleteOne()
    }
}

deleteUser();