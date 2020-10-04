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
    campoGenero.setAttribute('value', '');
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

    let labelOrden = document.createElement("span");
    let campoOrdenBusqueda = document.createElement("select");
    labelOrden.innerHTML = "orden: ";
    campoOrdenBusqueda.setAttribute('id', 'ordenBusqueda');
    campoOrdenBusqueda.setAttribute('value', '');
    let optionASC = document.createElement("option");
    optionASC.text = "ASC";
    campoOrdenBusqueda.add(optionASC);
    let optionDESC = document.createElement("option");
    optionDESC.text = "DESC";
    campoOrdenBusqueda.add(optionDESC);
    formHTML.appendChild(labelOrden);
    formHTML.appendChild(campoOrdenBusqueda);
    let botonGetApellido = document.createElement("button");
    botonGetApellido.setAttribute('class', 'btn-primary');
    botonGetApellido.setAttribute('id', 'getEstudiantesApellido');
    botonGetApellido.addEventListener("click", getEstudiantesApellido);
    botonGetApellido.textContent = 'ordenar estudiantes por apellido';
    formHTML.appendChild(botonGetApellido);

    let campoLUBusqueda = document.createElement("input");
    let labelLU = document.createElement("span");
    labelLU.innerHTML = "LU: ";
    campoLUBusqueda.setAttribute('value', '');
    campoLUBusqueda.setAttribute('id', 'luEstudianteBusqueda');
    campoLUBusqueda.setAttribute('type', 'number');
    formHTML.appendChild(labelLU);
    formHTML.appendChild(campoLUBusqueda);
    let botonGetLU = document.createElement("button");
    botonGetLU.setAttribute('class', 'btn-primary');
    botonGetLU.setAttribute('id', 'getEstudianteLU');
    botonGetLU.addEventListener("click", getEstudianteLU);
    botonGetLU.textContent = 'un estudiante por LU';
    formHTML.appendChild(botonGetLU);

    let campoGeneroBusqueda = document.createElement("select");
    let labelGeneroBusqueda = document.createElement("span");
    labelGeneroBusqueda.innerHTML = "Genero busqueda: ";
    campoGeneroBusqueda.setAttribute('id', 'generoEstudianteBusqueda');
    campoGeneroBusqueda.setAttribute('value', '');
    let optionFBusqueda = document.createElement("option");
    optionFBusqueda.text = "F";
    campoGeneroBusqueda.add(optionFBusqueda);
    let optionMBusqueda = document.createElement("option");
    optionMBusqueda.text = "M";
    campoGeneroBusqueda.add(optionMBusqueda);
    formHTML.appendChild(labelGeneroBusqueda);
    formHTML.appendChild(campoGeneroBusqueda);
    let botonGetGenero = document.createElement("button");
    botonGetGenero.setAttribute('class', 'btn-primary');
    botonGetGenero.setAttribute('id', 'getEstudianteGenero');
    botonGetGenero.addEventListener("click", getEstudianteGenero);
    botonGetGenero.textContent = 'estudiantes por genero';
    formHTML.appendChild(botonGetGenero);

    
    let campoCarrera_Busqueda = document.createElement("input");
    campoCarrera_Busqueda.setAttribute('id', 'carreraEstudianteBusqueda');
    campoCarrera_Busqueda.setAttribute('value', '');
    campoCarrera_Busqueda.setAttribute('placeHolder', 'carrera estudiante');
    formHTML.appendChild(campoCarrera_Busqueda);
    let campoCiudad_busqueda = document.createElement("input");
    campoCiudad_busqueda.setAttribute('id', 'ciudadEstudianteBusqueda');
    campoCiudad_busqueda.setAttribute('value', '');
    campoCiudad_busqueda.setAttribute('placeHolder', 'ciudad estudiante');
    formHTML.appendChild(campoCiudad_busqueda);

    let botonGetCarreraCiudad = document.createElement("button");
    botonGetCarreraCiudad.setAttribute('class', 'btn-primary');
    botonGetCarreraCiudad.setAttribute('id', 'getEstudianteCarreraCiudad');
    botonGetCarreraCiudad.addEventListener("click", getEstudiantesCarreraCiudad);
    botonGetCarreraCiudad.textContent = 'estudiantes de una carrera y ciudad';
    formHTML.appendChild(botonGetCarreraCiudad);

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

    let botonGetPorEstudiantes = document.createElement("button");
    botonGetPorEstudiantes.setAttribute('class', 'btn-primary');
    botonGetPorEstudiantes.setAttribute('id', 'getCarrerasOrdenEstudiantes');
    botonGetPorEstudiantes.addEventListener("click", getCarrerasOrdenEstudiantes);
    botonGetPorEstudiantes.textContent = 'carreras ordenadas por estudiantes';
    formHTML.appendChild(botonGetPorEstudiantes);

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
    formHTML.innerHTML = '';

    let campoLUMatricula = document.createElement("input");
    let labelLUMatricula = document.createElement("span");
    labelLUMatricula.innerHTML = "LU: ";
    campoLUMatricula.setAttribute('id', 'LUMatricula');
    campoLUMatricula.setAttribute('value', '');
    campoLUMatricula.setAttribute('type', 'number');
    formHTML.appendChild(labelLUMatricula);
    formHTML.appendChild(campoLUMatricula);
    let campoIDCarreraMatricula = document.createElement("input");
    let labelIDCarreraMatricula = document.createElement("span");
    labelIDCarreraMatricula.innerHTML = "id carrera: ";
    campoIDCarreraMatricula.setAttribute('id', 'idCarreraMatricula');
    campoIDCarreraMatricula.setAttribute('value', '');
    campoIDCarreraMatricula.setAttribute('type', 'number');
    formHTML.appendChild(labelIDCarreraMatricula);
    formHTML.appendChild(campoIDCarreraMatricula);
    let campoFechaIngresoMatricula = document.createElement("input");
    let labelFechaIngresoMatricula = document.createElement("span");
    labelFechaIngresoMatricula.innerHTML = "fecha ingreso: ";
    campoFechaIngresoMatricula.setAttribute('id', 'fechaIngresoMatricula');
    campoFechaIngresoMatricula.setAttribute('value', '');
    campoFechaIngresoMatricula.setAttribute('type', 'date');
    formHTML.appendChild(labelFechaIngresoMatricula);
    formHTML.appendChild(campoFechaIngresoMatricula);
    let campoFechaEgresoMatricula = document.createElement("input");
    let labelFechaEgresoMatricula = document.createElement("span");
    labelFechaEgresoMatricula.innerHTML = "fecha egreso: ";
    campoFechaEgresoMatricula.setAttribute('id', 'fechaEgresoMatricula');
    campoFechaEgresoMatricula.setAttribute('value', '');
    campoFechaEgresoMatricula.setAttribute('type', 'date');
    formHTML.appendChild(labelFechaEgresoMatricula);
    formHTML.appendChild(campoFechaEgresoMatricula);

    let botonPost = document.createElement("button");
    botonPost.setAttribute('class', 'btn-primary');
    botonPost.setAttribute('id', 'postMatricula');
    botonPost.addEventListener("click", addMatricula);
    botonPost.textContent = 'agregar matricula';
    formHTML.appendChild(botonPost);

    let botonGet = document.createElement("button");
    botonGet.setAttribute('class', 'btn-primary');
    botonGet.setAttribute('id', 'getMatriculas');
    botonGet.addEventListener("click", getMatriculas);
    botonGet.textContent = 'listar matriculas';
    formHTML.appendChild(botonGet);

    let botonGetReporte = document.createElement("button");
    botonGetReporte.setAttribute('class', 'btn-primary');
    botonGetReporte.setAttribute('id', 'getReporte');
    botonGetReporte.addEventListener("click", getReporte);
    botonGetReporte.textContent = 'generar reporte';
    formHTML.appendChild(botonGetReporte);

    let colThead = document.createElement("thead");
    let colTr = document.createElement("tr");
    let colThCarreraMatricula = document.createElement("th");
    let contenido = document.createTextNode("carrera");
    colThCarreraMatricula.appendChild(contenido);
    colTr.appendChild(colThCarreraMatricula);

    let colThLUEstudianteMatricula = document.createElement("th");
    contenido = document.createTextNode("LU estudiante");
    colThLUEstudianteMatricula.appendChild(contenido);
    colTr.appendChild(colThLUEstudianteMatricula);
    
    let colThApellidoEstudianteMatricula = document.createElement("th");
    contenido = document.createTextNode("apellido estudiante");
    colThApellidoEstudianteMatricula.appendChild(contenido);
    colTr.appendChild(colThApellidoEstudianteMatricula);

    let colThIngreso = document.createElement("th");
    contenido = document.createTextNode("ingreso");
    colThIngreso.appendChild(contenido);
    colTr.appendChild(colThIngreso);

    let colThEgreso = document.createElement("th");
    contenido = document.createTextNode("egreso");
    colThEgreso.appendChild(contenido);
    colTr.appendChild(colThEgreso);

    let colThGraduado = document.createElement("th");
    contenido = document.createTextNode("graduado");
    colThGraduado.appendChild(contenido);
    colTr.appendChild(colThGraduado);

    colThead.appendChild(colTr);
    let colTbody = document.createElement("tbody");
    tableHTML.innerHTML = '';
    tableHTML.appendChild(colThead);
    tableHTML.appendChild(colTbody);
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

function getCarrerasOrdenEstudiantes() {
    console.log("click EN BOTON GET CARRERAS ORDENADAS POR ESTUDIANTES");
    fetch('http://localhost:8080/Integrador3/rest/carreras/orden/cantincriptos')
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaCarreras(datos)
    })
}

function getEstudiantes() {
    console.log("click EN BOTON GET ESTUDIANTES");
    let url = baseUrl + "rest/estudiantes";
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaEstudiantes(datos)
    })
}

function getMatriculas() {
    console.log("click EN BOTON GET MATRICULAS");
    let url = baseUrl + "rest/matriculas";
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaMatriculas(datos)
    })
}

function getReporte() {
    console.log("click EN BOTON GET REPORTE");
    let url = baseUrl + "rest/matriculas/reporte";
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        console.log(datos)
        setTablaMatriculas(datos)
    })
}

function getEstudiantesApellido() {
    console.log("click EN BOTON GET ESTUDIANTES");
    let orden = document.querySelector("#ordenBusqueda").value;
    let url = baseUrl + "rest/estudiantes/orden/" + orden;
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaEstudiantes(datos)
    })
}

function getEstudianteLU() {
    console.log("click EN BOTON GET ESTUDIANTES");
    let LU = document.querySelector("#luEstudianteBusqueda").value;
    let url = baseUrl + "rest/estudiantes/" + LU;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        let arrDatos = [];
        arrDatos.push(datos);
        setTablaEstudiantes(arrDatos)
    })
}

function getEstudianteGenero() {
    console.log("click EN BOTON GET ESTUDIANTES");
    let generoBusqueda = document.querySelector("#generoEstudianteBusqueda").value;
    let url = baseUrl + "rest/estudiantes/genero/" + generoBusqueda;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(datos => {
        // console.log(datos)
        setTablaEstudiantes(datos)
    })
}

function getEstudiantesCarreraCiudad() {
    console.log("click EN BOTON GET ESTUDIANTES DE CARRERA Y CIUDAD");
    let carreraBusqueda = document.querySelector("#carreraEstudianteBusqueda").value;
    let ciudadBusqueda = document.querySelector("#ciudadEstudianteBusqueda").value;
    let url = baseUrl + "rest/estudiantes/carrera/" + carreraBusqueda + "/ciudad/" + ciudadBusqueda;
    console.log(url);
    fetch(url)
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

function addMatricula() {
    console.log("click EN BOTON ADD MATRICULA");
    let LUMatricula = document.querySelector("#LUMatricula").value;
    let idCarreraMatricula = document.querySelector("#idCarreraMatricula").value;
    let fechaIngresoMatricula = document.querySelector("#fechaIngresoMatricula").value;
    let fechaEgresoMatricula = document.querySelector("#fechaEgresoMatricula").value;
    let egresoMatricula = false;
    if (fechaEgresoMatricula) {
        egresoMatricula = true;
    }

    let objeto = {
        'estudiante': parseInt(LUMatricula),
        'carrera': parseInt(idCarreraMatricula),
        'fecha_inscripcion': fechaIngresoMatricula,
        'fecha_egreso': fechaEgresoMatricula,
        'graduado': egresoMatricula
    }

    let url = baseUrl + "rest/matriculas"
    console.log(url);
    console.log(objeto);
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
            resultado.innerHTML = "POST matricula status: " + r.status;
            if (r.status === 204) {
                resultado.innerHTML += " error";
            } else {
                getMatriculas();
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

function setTablaMatriculas(datos) {
    console.log(datos);
    let colTr;
    let colTdCarreraMatricula;
    let contenidoCarreraMatricula;
    let colTdLUEstudianteMatricula;
    let contenidoLUEstudianteMatricula;
    let colTdApellidoEstudianteMatricula;
    let contenidoApellidoEstudianteMatricula;
    let colTdIngresoMatricula;
    let contenidoIngresoMatricula;
    let colTdEgresoMatricula;
    let contenidoEgresoMatricula;
    let colTdGraduadoMatricula;
    let contenidoGraduadoMatricula;
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    for (let index = 0; index < datos.length; index++) {
        colTr = document.createElement("tr");
        colTdCarreraMatricula = document.createElement("td");
        contenidoCarreraMatricula = document.createTextNode(datos[index].carrera.nombre_carrera);
        colTdCarreraMatricula.appendChild(contenidoCarreraMatricula);
        colTr.appendChild(colTdCarreraMatricula);
        colTdLUEstudianteMatricula = document.createElement("td");
        contenidoLUEstudianteMatricula = document.createTextNode(datos[index].estudiante.lu);
        colTdLUEstudianteMatricula.appendChild(contenidoLUEstudianteMatricula);
        colTr.appendChild(colTdLUEstudianteMatricula);
        colTdApellidoEstudianteMatricula = document.createElement("td");
        contenidoApellidoEstudianteMatricula = document.createTextNode(datos[index].estudiante.apellido);
        colTdApellidoEstudianteMatricula.appendChild(contenidoApellidoEstudianteMatricula);
        colTr.appendChild(colTdApellidoEstudianteMatricula);
        colTdIngresoMatricula = document.createElement("td");
        contenidoIngresoMatricula = document.createTextNode(datos[index].fecha_inscripcion);
        colTdIngresoMatricula.appendChild(contenidoIngresoMatricula);
        colTr.appendChild(colTdIngresoMatricula);
        colTdEgresoMatricula = document.createElement("td");
        contenidoEgresoMatricula = document.createTextNode(datos[index].fecha_egreso);
        colTdEgresoMatricula.appendChild(contenidoEgresoMatricula);
        colTr.appendChild(colTdEgresoMatricula);
        colTdGraduadoMatricula = document.createElement("td");
        if (datos[index].graduado) {
            contenidoGraduadoMatricula = document.createTextNode("SI");
        }
        else {
            contenidoGraduadoMatricula = document.createTextNode("NO");
        }
        
        colTdGraduadoMatricula.appendChild(contenidoGraduadoMatricula);
        colTr.appendChild(colTdGraduadoMatricula);
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