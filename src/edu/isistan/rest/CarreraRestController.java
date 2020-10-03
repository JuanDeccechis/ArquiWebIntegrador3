package edu.isistan.rest;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import edu.isistan.dto.DTOReporteInscriptos;
import edu.isistan.entidad.Carrera;
import edu.isistan.jparepository.CarreraJPARepository;
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
	
	@GET
	@Path("/reporte")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DTOReporteInscriptos> getCarrrerasReporte() {
		return MatriculaJPARepository.getInstance().getReporte();
	}
	

}
