const url = "http://localhost:3000";

const contenedor_TotalAreas = document.querySelector('#contenedor_TotalAreas');
const contenedor_ProyectosVacio = document.querySelector('#contenedor_ProyectosVacio')
const contenedor_TablasVacio = document.querySelector('#contenedor_TablasVacio')



    ///////////////GET AREAS (Solo nombres)///////////////

const getAreas = async () => {
    try {
        const response = await fetch(`${url}/areas`)
        const jsonResponse = await response.json();
        jsonResponse.map(element => {
            contenedor_TotalAreas.innerHTML += `
            <div id="contenedor_Area" class="contenedor_Area" onclick="getProyectobyIdArea(${element.id})" >
                <p>${element.nombre}</p>
            </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
}

getAreas();





    ///////////////GET PROYECTOS BY ID AREAS///////////////
                ////(Me trae Id_Area, nombre_Area y array con proyectos)

const getProyectobyIdArea = async (id_Area) => { 
    try {

        while (contenedor_TablasVacio.firstChild) {
            contenedor_TablasVacio.removeChild(contenedor_TablasVacio.firstChild);
        } 

        const response = await fetch(`${url}/proyectos/${id_Area}`)
        const jsonResponse = await response.json();
        contenedor_ProyectosVacio.innerHTML = `
            <div class="contenedor_Proyectos">
                <img class="icon_cerrar" src="/image/cerrar.png" alt="">
                <h2 class="subtitulos_explorar">PROYECTOS del área de ${jsonResponse.nombre}</h2>
                <div id="contenedor_TotalProyectos" class="contenedor_Total"></div>
            </div>
                `  

        const contenedor_TotalProyectos = document.querySelector('#contenedor_TotalProyectos')

        jsonResponse.proyectos.map(element => { 
            contenedor_TotalProyectos.innerHTML += `
            <div id="contenedor_Proyecto" class="contenedor_Proyecto" 
            onclick="getTablasbyIdProyecto(${element.id})"
            >
                <p>${element.nombre}</p>
            </div>
            `        
        } ) 
    } catch (error) {
        console.log(error)
    }
}



    ///////////////GET TABLAS BY ID PROYECTO///////////////

const getTablasbyIdProyecto = async (id_Proyecto) => { 
    const response = await fetch(`${url}/tablas/${id_Proyecto}`)
    const jsonResponse = await response.json();
    contenedor_TablasVacio.innerHTML = `
    <div class="contenedor_Tablas">
        <img class="icon_cerrar" src="/image/cerrar.png" alt="">
        <h2 class="subtitulos_explorar">TABLAS del proyecto: ${jsonResponse.nombre}</h2>
        <div id="contenedor_TotalTablas" class="contenedor_TotalTablas"></div>
    </div>
        `
    const contenedor_TotalTablas = document.querySelector('#contenedor_TotalTablas')
   
    jsonResponse.tablas.map(element => { 
        contenedor_TotalTablas.innerHTML += `
        <div class="contenedor_Tabla">
            <p class="nombre_Tabla">${element.nombre}</p>
            <div class="contenedor_botones">
                <button class="button_tabla">Mostrar Tabla</button>
                <label class="input_labelTabla">Seleccionar Archivo
                    <input class="input_fileTabla" type="file">    
                </label>
            </div>
        </div>

        `        
    } )     
        




}