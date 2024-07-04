const socket = io()


const addMessages = () => {
    const msj = {
        nombre: document.getElementById('nombre').value,
        mensaje: document.getElementById('mensaje').value
    }
    socket.emit('msjNuevo', msj)

    return false
}

const render = (data) => {
    let html = data.map(elem =>  {
        return (
            `<div>
                <strong>${elem.nombre}: </strong> <em>${elem.mensaje}</em>
            </div>`
        )
    }).join(' ')

    document.getElementById('caja').innerHTML = html
}

socket.on('msjChat', (data) => {
    console.log(data);
    render(data)
    let chat = document.getElementById('caja')
    chat.scrollTop = chat.scrollHeight
})

