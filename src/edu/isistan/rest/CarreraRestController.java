package edu.isistan.rest;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import edu.isistan.dto.DTOReporteInscriptos;
import edu.isistan.entidad.Carrera;
import edu.isistan.entidad.Estudiante;
import edu.isistan.jparepository.CarreraJPARepository;
import edu.isistan.jparepository.EstudianteJPARepository;
import edu.isistan.jparepository.MatriculaJPARepository;



@Path("/carreras")
public class CarreraRestController {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Carrera> getAllCarreras() {
		return CarreraJPARepository.getInstance().getALL();
	}
	
	
	@GET
	@Path("/orden/cantincriptos")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Carrera> getAllCarrerarOrdInscriptos() {
		return CarreraJPARepository.getInstance().getCarrerasOrdCantEstudiantes();
	}

	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCarrera(Carrera carrera) {
		carrera.setId(-1);
		Carrera result= CarreraJPARepository.getInstance().insert(carrera);
		if(result==null) {
			return Response.status(204).entity("Ya existia una carrera con ese nombre").build();
		}else {
			return Response.status(201).entity(carrera).build();
		}
	}
	

}
