const url = "http://localhost:8080/restapi-1.0-SNAPSHOT/api";

const select_Areas = document.querySelector('#select_Areas')
const select_Proyectos = document.querySelector('#select_Proyectos')
const input_nuevaArea = document.querySelector('#input_nuevaArea')
const input_nuevoProyecto = document.querySelector('#input_nuevoProyecto')
const descripcion_proyecto = document.querySelector('#descripcion_proyecto')
const button_agregarUsuario = document.querySelector('.button_agregarUsuario')
const proyecto_seleccionado = document.querySelector('.proyecto_seleccionado')


let inputs = {}
let usuariosString = [];


    ///////////////GET AREAS PARA SELECTOR///////////////
    ///////////////GET AREAS PARA SELECTOR///////////////
    ///////////////GET AREAS PARA SELECTOR///////////////


    const getAreasSelector = async () => {
        try {  
            const response = await fetch(`${url}/areas`)
            const jsonResponse = await response.json();
            jsonResponse.map(element => {
                select_Areas.innerHTML += `
                <option value="${element.id_area}" >${element.nombre}</option>
                `
            });
            select_Areas.innerHTML += `
            <option value="crearNuevo">CREAR ÁREA</option>
            `
        } catch (error) {
            console.log(error)
        }

}

getAreasSelector()





    ///////////////GET PROYECTOS PARA SELECTOR///////////////
    ///////////////GET PROYECTOS PARA SELECTOR///////////////
    ///////////////GET PROYECTOS PARA SELECTOR///////////////


const getProyectosSelector = async () => {
    try {  
        // const secondChild = select_Proyectos.getElementsByTagName('option')[1]
        // console.log(secondChild)
        while (select_Proyectos.getElementsByTagName('option')[1]) {
            select_Proyectos.removeChild(select_Proyectos.getElementsByTagName('option')[1]);
        } 

        if (inputs.areas === "crearNuevo") {
            select_Proyectos.innerHTML += `
            <option value="crear_proyecto">CREAR PROYECTO</option>
            `
        } else { 
            const response = await fetch(`${url}/proyectos/area/${inputs.areas}`)
            const jsonResponse = await response.json();
    
            console.log(jsonResponse)
            jsonResponse.map(element => {
                select_Proyectos.innerHTML += `
                <option value="${element.id_proyecto}" >${element.nombre}</option>
                `
            });
            
            select_Proyectos.innerHTML += `
            <option value="crear_proyecto">CREAR PROYECTO</option>
            `    
        }
    } catch (error) {
        console.log(error)
    }
}



    ///////////////POST CREAR NUEVA AREA///////////////
    ///////////////POST CREAR NUEVA AREA///////////////
    ///////////////POST CREAR NUEVA AREA///////////////


const postCrearArea = async () => { 
    try {
        const area = {nombre: inputs.areas}
        const response = await fetch(`${url}/areas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(area)
        })
        if (response.ok) { 
            const jsonResponse = await response.json();
            console.log(jsonResponse)
        }
    } catch  (error) {
        console.log(error)
    }
}




    ///////////////POST CREAR NUEVO PROYECTO///////////////
    ///////////////POST CREAR NUEVO PROYECTO///////////////
    ///////////////POST CREAR NUEVO PROYECTO///////////////



const postCrearProyecto = async () => { 
    try {
        const proyecto = {nombre: inputs.proyectos}
        const response = await fetch(`${url}/proyectos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proyecto)
        })
        if (response.ok) { 
            const jsonResponse = await response.json();
            console.log(jsonResponse)
        }

    } catch  (error) {
        console.log(error)
    }
}



    ///////////////POST CREAR NUEVA TABLA///////////////
    ///////////////POST CREAR NUEVA TABLA///////////////
    ///////////////POST CREAR NUEVA TABLA///////////////



    const postCrearTabla = async () => { 
        try {
            const tabla = {
                id_area: inputs.areas,
                id_proyecto: inputs.proyectos,
                nombre: inputs.nombre,
                esquema: inputs.esquema,
                caracteres_especiales: inputs.caracteres_especiales
            }
            const response = await fetch(`${url}/tablas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tabla)
            })
            if (response.ok) { 
                const jsonResponse = await response.json();
                console.log(jsonResponse)
            }
    
        } catch  (error) {
            console.log(error)
        }
    }
    



const crear = (event) => { 
    event.preventDefault();
    // postCrearArea();
    // postCrearProyecto();
    postCrearTabla()
}

    ///////////////INCORPORAR USUARIOS A LA LISTA///////////////

// const agregarUsuariosLista = () => {
   
//     usuariosString.push(inputs.email);
//     if(usuariosString[0] === undefined) {usuariosString.shift()}
//     // console.log(usuariosString)
//     // console.log(usuariosString.length)

//     return usuariosString;
// }
    

// button_agregarUsuario.onclick = (event) => { 
//     event.preventDefault();
//     agregarUsuariosLista();
//     event.target.value = ""
// }




    ///////////////GUARDADO DE VALORES DE INPUTS///////////////
    ///////////////GUARDADO DE VALORES DE INPUTS///////////////
    ///////////////GUARDADO DE VALORES DE INPUTS///////////////

 
const valores = (event) => {
    event.preventDefault();
    if (event.target.type === "select-one") {
        if (event.target.value === "crearNuevo" || event.target.value === "crear_proyecto") {
            inputs = Object.assign({ ...inputs, [event.target.name]: event.target.value })
        } else {
            inputs = Object.assign({ ...inputs, [event.target.name]: parseInt(event.target.value, 10) })
        }
    }
    if (event.target.type === "text") {
        inputs = Object.assign({ ...inputs, [event.target.name]: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })
    }
    if (event.target.type === "email") {
        inputs = Object.assign({ ...inputs, [event.target.name]: event.target.value })
    }

    console.log(inputs)


    //inpus o selects a mostrar dependiendo de si se quiere crear nueva área

    if (typeof (inputs.areas) === "string") {
            input_nuevaArea.setAttribute("style", "display: inline")
            input_nuevoProyecto.setAttribute("style", "display: inline")
            select_Proyectos.setAttribute("style", "display: none")
            descripcion_proyecto.innerHTML = `Inserte el nombre del Proyecto`
       
    } else {        
        input_nuevaArea.setAttribute("style", "display: none")
        descripcion_proyecto.innerHTML = `Seleccione el Proyecto correspondiente, si no existe seleccione CREAR PROYECTO`
        select_Proyectos.setAttribute("style", "display: inline")
        input_nuevoProyecto.setAttribute("style", "display: none")
    }
    if (inputs.proyectos === "crear_proyecto") {
        input_nuevoProyecto.setAttribute("style", "display: inline")
    } else if (typeof (inputs.proyectos) === "number") { 
        
    }

}

select_Areas.addEventListener('input', valores)



