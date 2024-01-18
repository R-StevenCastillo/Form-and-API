const loadInitialTemplate = () => {
    const template = `
<div class="container" id="container">
    <div class="form-container sign-in-container">
        <form id="user-form">
            <h1>Datos</h1>
            <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <label>Nombre</label>
            <input type="text" name="name" placeholder="Nombre" />
            <label>Apellido</label>
            <input type="text" name="lastname" placeholder="Apellido" />
            <button class="big-button" type="submit">Registrate</button>
        </form>
    </div>
    <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-right">
                <h1>¡Bienvenido!</h1>
                <p>Por favor, completa tu registro con tu nombre y apellido.</p>
            </div>
        </div>
    </div>
</div>

<footer>
    <ul id="user-list"></ul>
</footer>`

    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;

}
const getUsers = async () => {
    const response = await fetch('/users/')
    const users = await response.json()
    const template = user => `
    <li>
        <div class="user-data-container">
    ${user.name} ${user.lastname}
        </div> 
        <div class="delete-btn-container">
            <button class="delete-btn" data-id="${user._id}">Eliminar</button>
        </div>
    </li>
    `

    const userList = document.getElementById('user-list')
    userList.innerHTML = users.map(user => template(user)).join('')
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Eliminado');
            location.reload()
        }
    })
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form');
    userForm.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        await fetch('/users/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        userForm.reset()
        getUsers()
    }
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}