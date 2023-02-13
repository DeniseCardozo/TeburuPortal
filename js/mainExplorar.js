const url = "http://localhost:3000";


const contenedor_AreasVacio = document.querySelector('#contenedor_AreasVacio');
const contenedor_ProyectosVacio = document.querySelector('#contenedor_ProyectosVacio')
const contenedor_TablasVacio = document.querySelector('#contenedor_TablasVacio')
const contenedor_Areas = document.querySelector('#contenedor_Areas');


    ///////////////GET AREAS (Solo nombres)///////////////

const getAreas = async () => {
    try {
        contenedor_AreasVacio.innerHTML = `
        <div class="contenedor_Areas" class="contenedor_Areas">
            <h2 class="subtitulos_explorar">ÁREAS</h2>
            <div id="contenedor_AreaRefuerzo" class="contenedor_AreaRefuerzo">
                <div id="contenedor_TotalAreas" class="contenedor_TotalAreas"></div>
            </div>
        </div>
        `  
        const contenedor_TotalAreas = document.querySelector('#contenedor_TotalAreas');

        const response = await fetch(`${url}/areas`)
        const jsonResponse = await response.json();
        jsonResponse.map(element => {
            contenedor_TotalAreas.innerHTML += `
            <div class="contenedor_Area" onclick="getProyectobyIdArea(${element.id})" >
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
        const contenedor_Proyectos = document.querySelector('.contenedor_Proyectos')


        jsonResponse.proyectos.map(element => { 
            contenedor_TotalProyectos.innerHTML += `
            <div id="contenedor_Proyecto" class="contenedor_Proyecto" 
            onclick="getTablasbyIdProyecto(${element.id})"
            >
            <p>${element.nombre}</p>
            </div>
            `        
        }) 
        
             
        if (jsonResponse.proyectos.length > 4) { 
            agregarFlechas(contenedor_Proyectos)
            console.log("supuestamenteeee andaaaaa")
        }

    } catch (error) {
        console.log(error)
    }
}

const contenedor_Proyectos = document.querySelector

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
