const url = "http://localhost:8080/restapi-1.0-SNAPSHOT/api";

const contenedor_AreasVacio = document.querySelector('#contenedor_AreasVacio');
const contenedor_ProyectosVacio = document.querySelector('#contenedor_ProyectosVacio')
const contenedor_TablasVacio = document.querySelector('#contenedor_TablasVacio')
const contenedor_Areas = document.querySelector('#contenedor_Areas');
const modal = document.querySelector('#id01');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


    ///////////////GET AREAS (Solo nombres)///////////////

const getAreas = async () => {
    try {
        contenedor_AreasVacio.innerHTML = `
        <div class="contenedor_Areas" class="contenedor_Areas">
            <h2 class="subtitulos_explorar">ÁREAS</h2>
                <div id="contenedor_TotalAreas" class="contenedor_TotalAreas"></div>
        </div>
        `  
        const contenedor_TotalAreas = document.querySelector('#contenedor_TotalAreas');

        const response = await fetch(`${url}/areas`)
        const jsonResponse = await response.json();
        jsonResponse.map(element => {
            contenedor_TotalAreas.innerHTML += `
            <div class="contenedor_Area" onclick="getProyectobyIdArea(${element.id_area})" >
                <p>${element.nombre}</p>
            </div>
            `
        });
        if (jsonResponse.length > 4) { 
            agregarFlechas(contenedor_Areas)
        }
    } catch (error) {
        console.log(error)
    }
}



getAreas();





    ///////////////GET PROYECTOS BY ID AREAS///////////////
                ////(Me trae Id_Area, nombre_Area y array con proyectos)

const getProyectobyIdArea = async (id_area) => { 
    try {

        while (contenedor_TablasVacio.firstChild) {
            contenedor_TablasVacio.removeChild(contenedor_TablasVacio.firstChild);
        } 

        const response1 = await fetch(`${url}/areas/${id_area}`)
        const jsonResponse1 = await response1.json();
        contenedor_ProyectosVacio.innerHTML = `
            <div class="contenedor_Proyectos">
                <h2 class="subtitulos_explorar">PROYECTOS del área de ${jsonResponse1.nombre}</h2>
                <div id="contenedor_TotalProyectos" class="contenedor_Total"></div>
            </div>
                `  
        
        const contenedor_TotalProyectos = document.querySelector('#contenedor_TotalProyectos')
        const contenedor_Proyectos = document.querySelector('.contenedor_Proyectos')

        const response2 = await fetch(`${url}/proyectos/area/${id_area}`)
        const jsonResponse2 = await response2.json();
        jsonResponse2.map(element => { 
            contenedor_TotalProyectos.innerHTML += `
            <div id="contenedor_Proyecto" class="contenedor_Proyecto" 
            onclick="getTablasbyIdProyecto(${element.id_proyecto})"
            >
            <p>${element.nombre}</p>
            </div>
            `        
        }) 
        
             
        // if (jsonResponse.proyectos.length > 4) { 
        //     agregarFlechas(contenedor_Proyectos)
        //     console.log("supuestamenteeee andaaaaa")
        // }

    } catch (error) {
        console.log(error)
    }
}

const contenedor_Proyectos = document.querySelector




    ///////////////GET TABLAS BY ID PROYECTO///////////////

const getTablasbyIdProyecto = async (id_Proyecto) => { 
    const response1 = await fetch(`${url}/proyectos/${id_Proyecto}`)
    const jsonResponse1 = await response1.json();
    contenedor_TablasVacio.innerHTML = `
    <div class="contenedor_Tablas">
        <h2 class="subtitulos_explorar">TABLAS del proyecto ${jsonResponse1.nombre}</h2>
        <div id="contenedor_TotalTablas" class="contenedor_TotalTablas"></div>
    </div>
        `
    
    const contenedor_TotalTablas = document.querySelector('#contenedor_TotalTablas')
   
    const response2 = await fetch(`${url}/tablas/proyecto/${id_Proyecto}`)
    const jsonResponse2 = await response2.json();
    jsonResponse2.map(element => { 
        contenedor_TotalTablas.innerHTML += `
        <div class="contenedor_Tabla">
            <p class="nombre_Tabla">${element.nombre}</p>
            <div class="contenedor_botones">
                <div id="button_previewtabla" class="button_previewtabla">
                    <img class="image_preview" src="/image/preview.png" alt="logo preview">
                </div>
                <label class="input_labelTabla">
                    <img class="image_subirArchivo" src="/image/subir-archivo.png" alt="logo subirArchivo">
                    <input class="input_fileTabla" type="file">    
                </label>
            </div>
        </div>
        ` 
        console.log(element)
    } )     
}




    ///////////////ABRIR MODAL Editar///////////////

let inputsEditar = {}

const abrirModal = async (id_tabla) => { 
    const response = await fetch(`${url}/tablas/${id_tabla}`)
    const jsonResponse = await response.json();

    document.body.innerHTML += `
    <div id="id01" class="modal">
        <form class="form" action="" onsubmit="editTabla(${jsonResponse.id_tabla})">
            <img class="icon_cerrarModal" src="/image/cerrar.png" alt="" onclick="document.getElementById('id01').style.display='none'">          
            <div class="container">
                <label>Nombre: 
                    <p id="valor_AnteriorNombre" class="valor_Anterior"></p>
                    <input type="text" value="${jsonResponse.nombre}" name="nombre" onchange="valoresEditar(event)">
                </label>
                <label>Schema
                    <p id="valor_AnteriorSchema" class="valor_Anterior"></p>
                    <input type="text" value="${jsonResponse.esquema}" name="schema" onchange="valoresEditar(event)">
                </label>
                <label>Carácteres no permitidos
                    <p id="valor_AnteriorCaracteres" class="valor_Anterior"></p>
                    <input type="text" value="${jsonResponse.caracteres_especiales}" name="caracteres_especiales" onchange="valoresEditar(event)">
                </label>
                <button class="button_EditarTabla" type="submit">Editar tabla</button>
                <button class="button_cancelar" type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancelar</button>
            </div>

        </form>
        </div>
    `        

    inputsEditar = {
        id_tabla: jsonResponse.id_tabla,
        nombre: jsonResponse.nombre,
        esquema: jsonResponse.esquema,
        caracteres_especiales: jsonResponse.caracteres_especiales
    }

    document.getElementById('id01').style.display = 'block'

}



const valoresEditar = (event) => {
    event.preventDefault();
    inputsEditar = Object.assign({ ...inputsEditar, [event.target.name]: event.target.value })

    console.log(inputsEditar)
    
}



    ///////////////PUT EDITAR TABLA //////////////


const editTabla = async () => { 
    try {
        const tabla = {
            nombre: inputsEditar.nombre,
            esquema: inputsEditar.esquema,
            caracteres_especiales: inputsEditar.caracteres_especiales
        }
        const response = await fetch(`${url}/tablas/${inputsEditar.id_tabla}`, {
            method: 'PUT',
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


const editar = (event) => { 
    event.preventDefault();
    editTabla();
}

    ///////////////DELETE TABLA por Id///////////////
    const deleteTabla = (id_tabla) => { 
        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar tabla!',
                cancelButtonText: 'Cancelar'
              }).then( async (result) => {
                  if (result.isConfirmed) {
                    await fetch(`${url}/tablas/${id_tabla}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    })
        
                  Swal.fire(
                    'Eliminada!',
                    'La tabla ha sido eliminada correctamente.',
                    'success'
                  )
                }
              })
        } catch  (error) {
            console.log(error)
        }
    }
    

    


