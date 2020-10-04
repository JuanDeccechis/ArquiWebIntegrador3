package edu.isistan.jparepository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import edu.isistan.entidad.Estudiante;

/**
 * @author Belen Enemark
 * @author Juan Deccechis
 * @author Mateo Zarrabeitia
 * Esta clase se ocupa  de insertar, actualizar y eliminar estudiante*/
public class EstudianteJPARepository implements GenericRepository<Estudiante, Integer> {
	
	private static EstudianteJPARepository estudiante;

	/**Crea el constructor */
	public EstudianteJPARepository() {
	}
	
	public static EstudianteJPARepository getInstance() {
		if(estudiante == null)
			estudiante = new EstudianteJPARepository();
		return estudiante;
	}


	/**Carga el estudiante, pide el dni para corroborar si el estudiante existe en base a su dni y en caso de que no exista lo persiste,
	 * si el estudiante ya se encuentra persistido trae la LU de la base de datos y se lo setea al objeto.
	 * @param estudiante se ingresa un objeto estudiante
	 * @return */
	@Override
	public Estudiante insert(Estudiante estudiante) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			Estudiante estudianteaux = this.getEstudianteDNI(estudiante.getDni()); 
			if (estudianteaux!= null ) {
				System.out.println("El estudiante con el DNI: "+estudiante.getDni()+" ya se encuentra registrado");
				estudiante.setLu(estudianteaux.getLu());
				return null;
			} else {
				if (estudiante.getLu() == -1) {
					estudiante.setLu(this.getLUUltimoEstudiante()+1);
					em.getTransaction().begin();
					em.persist(estudiante);
					em.getTransaction().commit();
				} else {
					em.getTransaction().begin();
					em.persist(estudiante);
					em.getTransaction().commit();
				}
				return estudiante;
			}

		} catch (Exception e) {
			throw new RuntimeException("Error parsing date", e);
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	/**Actualiza el estudiante, siempre que el estudiante exista
	 * @param estudiante se ingresa un estudiante*/
	@Override
	public void update(Estudiante estudiante) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			em.getTransaction().begin();
			estudiante = em.merge(estudiante);
			em.getTransaction().commit();
		} catch (Exception e) {
			if (em.find(estudiante.getClass(), estudiante.getLu()) != null ) {
				System.out.println("La persona no existe en la bd");
			}
			throw e;
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	/**Borra el estudiante
		@param  lu, se pasa la libreta universitaria
	 * Se guarda el dato y se controla en el try que exista el estudiante*/
	@Override
	public void delete(Integer lu) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			em.getTransaction().begin();

			Estudiante estudiante = null;

			try {
				estudiante = em.getReference(Estudiante.class, lu);
				estudiante.getLu();
			} catch (Exception e) {
				System.out.println("Error al eliminar el estuduiante LU: "+lu);
			}
			em.remove(estudiante);
			em.getTransaction().commit(); 
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}

	/**Obtiene todos los estudiantes
	 * @return listado de todos los estudiantes*/
	@Override
	public List<Estudiante> getALL() {
		EntityManager em = EMF.createEntityManager();
		List<Estudiante> listado = em.createQuery("SELECT E FROM Estudiante E", Estudiante.class)
				.getResultList();

		return listado;
	}




	/**Obtener Libreta universitaria
	 * @param lu es la libreta universitaria
	 * @return em.find, retorna un estudiante encontrado por libreta universitaria*/
	@Override
	public Estudiante getId(Integer lu) {
		EntityManager em = EMF.createEntityManager();
		try {
			return em.find(Estudiante.class, lu);
		} finally {
			em.close();
		}
	}
	/**Obtener estudiante por dni
	 * @param dni documento nacional de identidad
	 * @return listado.get(0) un estudiante con dni */
	public Estudiante getEstudianteDNI(int dni) {
		EntityManager em = EMF.createEntityManager();
		List<Estudiante> listado = em.createQuery("SELECT E FROM Estudiante E WHERE E.dni =:dni ", Estudiante.class)
				.setParameter("dni", dni)
				.getResultList();
		em.close();
		if (listado.size() == 0) {
			return null;
		} else {
			return listado.get(0);		
		}

	}
	/**Ordena los estudiantes por apellido
	 * @param criterio puede ser ASC o DESC
	 * @return listado listado estudiantes ordenado por apellido*/
	public List<Estudiante> getEstudiantesOrdenados(String criterio) {
		if (criterio.equalsIgnoreCase("ASC") || criterio.equalsIgnoreCase("DESC")) {
			EntityManager em = EMF.createEntityManager();
			List<Estudiante> listado = em.createQuery("SELECT E FROM Estudiante E ORDER BY E.apellido " + criterio, Estudiante.class)
					.getResultList();
			em.close();
			return listado;
		}
		return null;
	}
	/** Obtiene el ultimo id del estudiante cargado
	 * @return ultimoLUEstudiante el ultimo id del estudiante dado de alta*/
	public Integer getLUUltimoEstudiante() {
		EntityManager em = EMF.createEntityManager();
		List<Estudiante> ultimoEstudiante = (List<Estudiante>) em.createQuery("SELECT E FROM Estudiante E ORDER BY E.lu DESC", Estudiante.class)
				.setMaxResults(1)
				.getResultList();
		em.close();
		if (ultimoEstudiante.size() == 0) {
			return 0;
		} else {
			return ultimoEstudiante.get(0).getLu();		
		}
	}
	/**Ordena los estudiantes por genero
	 * @param genero genero del estudiante
	 * @return listado estudiantes ordenados por genero*/
	public List<Estudiante> getEstudiantesGenero(String genero) {
		if (genero.equalsIgnoreCase("F") || genero.equalsIgnoreCase("M")) {
		EntityManager em = EMF.createEntityManager();
		List<Estudiante> listado = em.createQuery("SELECT E FROM Estudiante E WHERE E.genero =:genero ", Estudiante.class)
				.setParameter("genero", genero)
				.getResultList();
		em.close();
		return listado;
		}
		return null;
	}
	/**Ordena los estudiantes por carrera y ciudad
	 * @param carrera carrera que cursa
	 * @param ciudad ciudad en la que vive
	 * @return listado estudiantes por genero*/
	public List<Estudiante> getEstudiantesCarreraCiudad(String carrera,String ciudad) {
		EntityManager em = EMF.createEntityManager();
		Query q = em.createNativeQuery("select e.* from Estudiante e \r\n" + 
				"join Matricula m ON m.id_estudiante = e.lu\r\n" + 
				"join Carrera c ON m.id_carrera = c.id\r\n" + 
				"where c.nombre_carrera =:carrera AND e.ciudad_residencia =:ciudad ", Estudiante.class)
				.setParameter("carrera", carrera).
				setParameter("ciudad", ciudad);
		List<Estudiante> listado = q.getResultList();
		em.close();
		return listado;
	}




}
