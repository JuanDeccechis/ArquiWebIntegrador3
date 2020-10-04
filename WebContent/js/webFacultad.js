"use strict";

let formHTML;
let tableHTML;
let baseUrl = "http://localhost:8080/Integrador3/";

document.querySelector("#carreras").addEventListener("click", crearContenidoCarreras);
document.querySelector("#estudiantes").addEventListener("click", crearContenidoEstudiantes);
document.querySelector("#relaciones").addEventListener("click", crearContenidoRelaciones);

formHTML = document.querySelector("#form");
tableHTML = document.querySelector("#table");


function crearContenidoEstudiantes() {
    formHTML.innerHTML = '';

    let campoNombre = document.createElement("input");
    let campoApellido = document.createElement("input");
    let campoDni = document.createElement("input");
    let campoGenero = document.createElement("select");
    let campoEdad = document.createElement("input");
    let campoCiudad_residencia = document.createElement("input");
    
    campoNombre.setAttribute('id', 'nombreEstudiante');
    campoNombre.setAttribute('value', '');
    campoNombre.setAttribute('placeHolder', 'nombre estudiante');
    formHTML.appendChild(campoNombre);
    campoApellido.setAttribute('id', 'apellidoEstudiante');
    campoApellido.setAttribute('value', '');
    campoApellido.setAttribute('placeHolder', 'apellido estudiante');
    formHTML.appendChild(campoApellido);
    let labelDni = document.createElement("span");
    labelDni.innerHTML = "DNI: ";
    campoDni.setAttribute('id', 'dniEstudiante');
    campoDni.setAttribute('value', '');
    campoDni.setAttribute('type', 'number');
    formHTML.appendChild(labelDni);
    formHTML.appendChild(campoDni);
    let labelEdad = document.createElement("span");
    labelEdad.innerHTML = "Edad: ";
    campoEdad.setAttribute('id', 'edadEstudiante');
    campoEdad.setAttribute('value', '');
    campoEdad.setAttribute('type', 'number');
    formHTML.appendChild(labelEdad);
    formHTML.appendChild(campoEdad);
    campoCiudad_residencia.setAttribute('id', 'ciudadEstudiante');
    campoCiudad_residencia.setAttribute('value', '');
    campoCiudad_residencia.setAttribute('placeHolder', 'ciudad estudiante');
    formHTML.appendChild(campoCiudad_residencia);
    let labelGenero = document.createElement("span");
    labelGenero.innerHTML = "Genero: ";
    campoGenero.setAttribute('id', 'generoEstudiante');
    campoCiudad_residencia.setAttribute('value', '');
    let optionF = document.createElement("option");
    optionF.text = "F";
    campoGenero.add(optionF);
    let optionM = document.createElement("option");
    optionM.text = "M";
    campoGenero.add(optionM);
    formHTML.appendChild(labelGenero);
    formHTML.appendChild(campoGenero);

    let botonPost = document.createElement("button");
    botonPost.setAttribute('class', 'btn-primary');
    botonPost.setAttribute('id', 'postEstudiante');
    botonPost.addEventListener("click", addEstudiante);
    botonPost.textContent = 'agregar estudiante';
    formHTML.appendChild(botonPost);


    let botonGet = document.createElement("button");
    botonGet.setAttribute('class', 'btn-primary');
    botonGet.setAttribute('id', 'getEstudiantes');
    botonGet.addEventListener("click", getEstudiantes);
    botonGet.textContent = 'listar estudiantes';
    formHTML.appendChild(botonGet);


    let colThead = document.createElement("thead");
    let colTr = document.createElement("tr");
    let colThLU = document.createElement("th");
    let contenido = document.createTextNode("LU");
    colThLU.appendChild(contenido);
    colTr.appendChild(colThLU);

    let colThNombre = document.createElement("th");
    contenido = document.createTextNode("Nombre");
    colThNombre.appendChild(contenido);
    colTr.appendChild(colThNombre);

    let colThApellido = document.createElement("th");
    contenido = document.createTextNode("Apellido");
    colThApellido.appendChild(contenido);
    colTr.appendChild(colThApellido);

    let colThEdad = document.createElement("th");
    contenido = document.createTextNode("Edad");
    colThEdad.appendChild(contenido);
    colTr.appendChild(colThEdad);

    let colThGenero = document.createElement("th");
    contenido = document.createTextNode("Genero");
    colThGenero.appendChild(contenido);
    colTr.appendChild(colThGenero);
    
    let colThDNI = document.createElement("th");
    contenido = document.createTextNode("DNI");
    colThDNI.appendChild(contenido);
    colTr.appendChild(colThDNI);

    let colThCiudad = document.createElement("th");
    contenido = document.createTextNode("Ciudad");
    colThCiudad.appendChild(contenido);
    colTr.appendChild(colThCiudad);

    colThead.appendChild(colTr);
    let colTbody = document.createElement("tbody");
    tableHTML.innerHTML = '';
    tableHTML.appendChild(colThead);
    tableHTML.appendChild(colTbody);
}

function crearContenidoCarreras() {
    formHTML.innerHTML = '';

    let campoNombre = document.createElement("input");
    campoNombre.setAttribute('id', 'nombreCarrera');
    campoNombre.setAttribute('value', '');
    campoNombre.setAttribute('placeHolder', 'nombre carrera');
    formHTML.appendChild(campoNombre);
    let botonPost = document.createElement("button");
    botonPost.setAttribute('class', 'btn-primary');
    botonPost.setAttribute('id', 'postCarrera');
    botonPost.addEventListener("click", addCarrera);
    botonPost.textContent = 'agregar carrera';
    formHTML.appendChild(botonPost);

    let botonGet = document.createElement("button");
    botonGet.setAttribute('class', 'btn-primary');
    botonGet.setAttribute('id', 'getCarreras');
    botonGet.addEventListener("click", getCarreras);
    botonGet.textContent = 'listar carreras';
    formHTML.appendChild(botonGet);

    console.log("CLICK");
    let colThead = document.createElement("thead");
    let colTr = document.createElement("tr");
    let colThID = document.createElement("th");
    let contenido = document.createTextNode("ID");
    colThID.appendChild(contenido);
    colTr.appendChild(colThID);

    let colThNombre = document.createElement("th");
    contenido = document.createTextNode("Nombre");
    colThNombre.appendChild(contenido);
    colTr.appendChild(colThNombre);

    colThead.appendChild(colTr);
    let colTbody = document.createElement("tbody");
    colTbody.setAttribute("id", "tbody");
    tableHTML.innerHTML = '';
    tableHTML.appendChild(colThead);
    tableHTML.appendChild(colTbody);
}

function crearContenidoRelaciones() {
    console.log("CLICK");
}

function getCarreras() {
    console.log("click EN BOTON GET CARRERAS");
    fetch('http://localhost:8080/Integrador3/rest/carreras')
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaCarreras(datos)
    })
}

function getEstudiantes() {
    console.log("click EN BOTON GET ESTUDIANTES");
    fetch('http://localhost:8080/Integrador3/rest/estudiantes')
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaEstudiantes(datos)
    })
}

function addCarrera() {
    console.log("click EN BOTON ADD CARRERAS");
    let nombreCarrera = document.querySelector("#nombreCarrera").value;
    let objeto = {
        'nombre_carrera': nombreCarrera
    }
    let url = baseUrl + "rest/carreras"
    fetch(url, {
        "method": 'POST',
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(objeto)
    })
        .then(function(r){
            console.log("POST status: " + r.status);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = "POST Carrera status: " + r.status;
            if (r.status === 204) {
                resultado.innerHTML += " Ya existia una carrera con ese nombre";
            }
            else {
                getCarreras();
            }
            setTimeout(function() {
				resultado.innerHTML = '';
				}, 3000);
        })
    .catch(function(error){
        console.log("Error en CREATE: " + error);
    })
}

function addEstudiante() {
    console.log("click EN BOTON ADD ESTUDIANTE");
    let nombreEstudiante = document.querySelector("#nombreEstudiante").value;
    let apellidoEstudiante = document.querySelector("#apellidoEstudiante").value;
    let edadEstudiante = document.querySelector("#edadEstudiante").value;
    let dniEstudiante = document.querySelector("#dniEstudiante").value;
    let generoEstudiante = document.querySelector("#generoEstudiante").value;
    let ciudadEstudiante = document.querySelector("#ciudadEstudiante").value;

    let objeto = {
        'nombre': nombreEstudiante,
        'apellido': apellidoEstudiante,
        'edad': edadEstudiante,
        'dni': dniEstudiante,
        'genero': generoEstudiante,
        'ciudad_residencia': ciudadEstudiante
    }
    let url = baseUrl + "rest/estudiantes"
    fetch(url, {
        "method": 'POST',
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(objeto)
    })
        .then(function(r){
            console.log("POST status: " + r.status);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = "POST Estudiante status: " + r.status;
            if (r.status === 204) {
                resultado.innerHTML += " Ya existia un estudiante con ese DNI";
            } else {
                getEstudiantes();
            }
            setTimeout(function() {
				resultado.innerHTML = '';
				}, 3000);
        })
    .catch(function(error){
        console.log("Error en CREATE: " + error);
    })
}

function setTablaCarreras(datos) {
    console.log(datos);
    let colTr;
    let colTdId;
    let contenidoId;
    let colTdNombre;
    let contenidoNombre;
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let index = 0; index < datos.length; index++) {
        colTr = document.createElement("tr");
        colTdId = document.createElement("td");
        contenidoId = document.createTextNode(datos[index].id);
        colTdId.appendChild(contenidoId);
        colTr.appendChild(colTdId);
        colTdNombre = document.createElement("td");
        contenidoNombre = document.createTextNode(datos[index].nombre_carrera);
        colTdNombre.appendChild(contenidoNombre);
        colTr.appendChild(colTdNombre);
        tbody.appendChild(colTr);
    }
}

function setTablaEstudiantes(datos) {
    console.log(datos);
    let colTr;
    let colTdId;
    let contenidoId;
    let colTdNombre;
    let contenidoNombre;
    
    let colTdApellido;
    let contenidoApellido;
    let colTdEdad;
    let contenidoEdad;
    let colTdGenero;
    let contenidoGenero;
    let colTdCiudad;
    let contenidoCiudad;
    let colTdDni;
    let contenidoDni;
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let index = 0; index < datos.length; index++) {
        colTr = document.createElement("tr");
        colTdId = document.createElement("td");
        contenidoId = document.createTextNode(datos[index].lu);
        colTdId.appendChild(contenidoId);
        colTr.appendChild(colTdId);
        colTdNombre = document.createElement("td");
        contenidoNombre = document.createTextNode(datos[index].nombre);
        colTdNombre.appendChild(contenidoNombre);
        colTr.appendChild(colTdNombre);
        
        
        colTdApellido = document.createElement("td");
        contenidoApellido = document.createTextNode(datos[index].apellido);
        colTdApellido.appendChild(contenidoApellido);
        colTr.appendChild(colTdApellido);
        
        colTdEdad = document.createElement("td");
        contenidoEdad = document.createTextNode(datos[index].edad);
        colTdEdad.appendChild(contenidoEdad);
        colTr.appendChild(colTdEdad);
        
        colTdGenero = document.createElement("td");
        contenidoGenero = document.createTextNode(datos[index].genero);
        colTdGenero.appendChild(contenidoGenero);
        colTr.appendChild(colTdGenero);
        
        colTdDni = document.createElement("td");
        contenidoDni = document.createTextNode(datos[index].dni);
        colTdDni.appendChild(contenidoDni);
        colTr.appendChild(colTdDni);
        
        colTdCiudad = document.createElement("td");
        contenidoCiudad = document.createTextNode(datos[index].ciudad_residencia);
        colTdCiudad.appendChild(contenidoCiudad);
        colTr.appendChild(colTdCiudad);
        tbody.appendChild(colTr);
    }
}