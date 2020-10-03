package edu.isistan.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import edu.isistan.dto.DTOEstudiante;
import edu.isistan.entidad.Carrera;
import edu.isistan.entidad.Estudiante;
import edu.isistan.entidad.Matricula;
import edu.isistan.jparepository.EstudianteJPARepository;

@Path("/estudiantes")
public class EstudianteRestController {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<DTOEstudiante> getAllEstudiantes() {
		List<DTOEstudiante> lista = new ArrayList<DTOEstudiante>();
		for (Estudiante estudiante : EstudianteJPARepository.getInstance().getALL()) {
			DTOEstudiante dto= new DTOEstudiante();
			dto.setLu(estudiante.getLu());
			dto.setDni(estudiante.getDni());
			dto.setEdad(estudiante.getEdad());
			dto.setNombre(estudiante.getNombre());
			dto.setApellido(estudiante.getApellido());
			dto.setCiudad_residencia(estudiante.getCiudad_residencia());
			dto.setGenero(estudiante.getGenero());
			if (!estudiante.getCarreras().isEmpty()) {
				List<Carrera> auxCarreras = new ArrayList<>();
				for (Matricula carrera : estudiante.getCarreras()) {
					auxCarreras.add(carrera.getCarrera());
				}
				dto.setCarreras(auxCarreras);
			}
			lista.add(dto);
		}
		return lista;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public DTOEstudiante getIdEstudiante(@PathParam("id") String msg) {
		Integer id = Integer.valueOf(msg);
		Estudiante estudiante = EstudianteJPARepository.getInstance().getId(id);
		DTOEstudiante dto= new DTOEstudiante();
		dto.setLu(estudiante.getLu());
		dto.setDni(estudiante.getDni());
		dto.setEdad(estudiante.getEdad());
		dto.setNombre(estudiante.getNombre());
		dto.setApellido(estudiante.getApellido());
		dto.setCiudad_residencia(estudiante.getCiudad_residencia());
		dto.setGenero(estudiante.getGenero());
		if (!estudiante.getCarreras().isEmpty()) {
			List<Carrera> auxCarreras = new ArrayList<>();
			for (Matricula carrera : estudiante.getCarreras()) {
				auxCarreras.add(carrera.getCarrera());
			}
			dto.setCarreras(auxCarreras);
		}
		return dto;
	}

	@GET
	@Path("/orden/{ord}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DTOEstudiante> getALLEstudiantesOrder(@PathParam("ord") String order) {
		List<DTOEstudiante> lista = new ArrayList<DTOEstudiante>();
		for (Estudiante estudiante : EstudianteJPARepository.getInstance().getEstudiantesOrdenados(order)) {
			DTOEstudiante dto= new DTOEstudiante();
			dto.setLu(estudiante.getLu());
			dto.setDni(estudiante.getDni());
			dto.setEdad(estudiante.getEdad());
			dto.setNombre(estudiante.getNombre());
			dto.setApellido(estudiante.getApellido());
			dto.setCiudad_residencia(estudiante.getCiudad_residencia());
			dto.setGenero(estudiante.getGenero());
			if (!estudiante.getCarreras().isEmpty()) {
				List<Carrera> auxCarreras = new ArrayList<>();
				for (Matricula carrera : estudiante.getCarreras()) {
					auxCarreras.add(carrera.getCarrera());
				}
				dto.setCarreras(auxCarreras);
			}
			lista.add(dto);
		}
		return lista;	
	}

	@GET
	@Path("/genero/{gen}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DTOEstudiante> getAllEstudiantesGenero(@PathParam("gen") String genero) {
		List<DTOEstudiante> lista = new ArrayList<DTOEstudiante>();
		for (Estudiante estudiante : EstudianteJPARepository.getInstance().getEstudiantesGenero(genero)) {
			DTOEstudiante dto= new DTOEstudiante();
			dto.setLu(estudiante.getLu());
			dto.setDni(estudiante.getDni());
			dto.setEdad(estudiante.getEdad());
			dto.setNombre(estudiante.getNombre());
			dto.setApellido(estudiante.getApellido());
			dto.setCiudad_residencia(estudiante.getCiudad_residencia());
			dto.setGenero(estudiante.getGenero());
			if (!estudiante.getCarreras().isEmpty()) {
				List<Carrera> auxCarreras = new ArrayList<>();
				for (Matricula carrera : estudiante.getCarreras()) {
					auxCarreras.add(carrera.getCarrera());
				}
				dto.setCarreras(auxCarreras);
			}
			lista.add(dto);
		}
		return lista;	
	}

	@GET
	@Path("/carrera/{carrera}/ciudad/{ciudad}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DTOEstudiante> getEstudiantesCarreraResidencia(@PathParam("carrera") String carera, @PathParam("ciudad") String ciudad ) {
		List<DTOEstudiante> lista = new ArrayList<DTOEstudiante>();
		for (Estudiante estudiante : EstudianteJPARepository.getInstance().getEstudiantesCarreraCiudad(carera, ciudad)) {
			DTOEstudiante dto= new DTOEstudiante();
			dto.setLu(estudiante.getLu());
			dto.setDni(estudiante.getDni());
			dto.setEdad(estudiante.getEdad());
			dto.setNombre(estudiante.getNombre());
			dto.setApellido(estudiante.getApellido());
			dto.setCiudad_residencia(estudiante.getCiudad_residencia());
			dto.setGenero(estudiante.getGenero());
			if (!estudiante.getCarreras().isEmpty()) {
				List<Carrera> auxCarreras = new ArrayList<>();
				for (Matricula carrera : estudiante.getCarreras()) {
					auxCarreras.add(carrera.getCarrera());
				}
				dto.setCarreras(auxCarreras);
			}
			lista.add(dto);
		}
		return lista;	
	}




	//FORMATO JSON PARA PERSISTIR
	//	{
	//	    "nombre": "Juan",
	//	    "apellido": "Sanchez",
	//	    "edad": 18,
	//	    "genero": "M",
	//	    "dni": 22222143,
	//	    "ciudad_residencia": "Tandil"
	//	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createEstudiante(Estudiante estudiante) {
		estudiante.setLu(-1);
		Estudiante result= EstudianteJPARepository.getInstance().insert(estudiante);
		if(result==null) {
			return Response.status(200).entity("El estudiante no se pudo crear").build();
		}else {
			return Response.status(201).entity(estudiante).build();
		}
	}

}


