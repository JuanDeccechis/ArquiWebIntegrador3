package edu.isistan.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import edu.isistan.entidad.Matricula;
import edu.isistan.jparepository.MatriculaJPARepository;

@Path("/matriculas")
public class MatriculaRestController {


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Matricula> getAllMatriculas() {
		return MatriculaJPARepository.getInstance().getALL();
	}


	@GET
	@Path("/{id}/{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public Matricula getIdMatricula(@PathParam("id") String msg,@PathParam("id2") String msg2) {
		Integer idEstudiante = Integer.valueOf(msg);
		Integer idCarrera = Integer.valueOf(msg2);
		return MatriculaJPARepository.getInstance().getId(idCarrera+"/"+idEstudiante);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response matricular(Matricula matricula) {
		Matricula result= MatriculaJPARepository.getInstance().insert(matricula);
		if(result==null) {
			return Response.status(204).entity("El alumno ya se encuentra matriculado").build();
		}else {
			return Response.status(201).entity(matricula).build();
		}
	}
}
