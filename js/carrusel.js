let contenedor_Area = document.querySelectorAll('.contenedor_Area');
console.log(contenedor_Area)
let contenedor_AreaUltimo = contenedor_Area[contenedor_Area.length-1]

const agregarFlechas = (contenedor) => { 
    contenedor.innerHTML += `
    <div id="contenedor_botonesFlecha" class="contenedor_botonesFlecha" >
        <img id="botonFlechaIzquierda" class="botonFlechaIzquierda" src="/image/flecha-izquierda.png" alt="flecha-izquierda">
        <img id="botonFlechaDerecha" class="botonFlechaDerecha" src="/image/flecha-derecha.png" alt="flecha-derecha">
    </div>
    `
}

const botonFlechaIzquierda = document.querySelector('#botonFlechaIzquierda');
const botonFlechaDerecha = document.querySelector('#botonFlechaDerecha');

contenedor_TotalAreas.insertAdjacentHTML('afterbegin', contenedor_AreaUltimo)