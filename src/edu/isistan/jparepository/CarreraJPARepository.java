package edu.isistan.jparepository;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import edu.isistan.entidad.Carrera;
/**
 * @author Belen Enemark
 * @author Juan Deccechis
 * @author Mateo Zarrabeitia
 * Esta clase se ocupa  de insertar la carrera y de actualizar la carrera*/
public class CarreraJPARepository  implements GenericRepository<Carrera, Integer>{

	private static CarreraJPARepository carrera;
	
	/**Controlador de carrera */
	public CarreraJPARepository() {
	}	
	
	
	public static CarreraJPARepository getInstance() {
		if(carrera == null)
			carrera = new CarreraJPARepository();
		return carrera;
	}

	/** Obtiene el ultimo id del estudiante cargado
	 * @return ultimoLUEstudiante el ultimo id del estudiante dado de alta*/
	public Integer getIdUltimaCarrera() {
		EntityManager em = EMF.createEntityManager();
		List<Carrera> ultimaCarrera= (List<Carrera>) em.createQuery("SELECT C FROM Carrera C ORDER BY C.id DESC", Carrera.class)
				.setMaxResults(1)
				.getResultList();
		em.close();
		if (ultimaCarrera.size() == 0) {
			return 0;
		} else {
			return ultimaCarrera.get(0).getId();		
		}
	}
	
	/**Inserta la carrera en la base de datos 
	 * @param carrera se carga el objeto que contiene los datos de la carrera*/
	@Override
	public Carrera insert(Carrera carrera) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			if (this.getCarreraNombre(carrera.getNombre_carrera()) != null ) {
				System.out.println("La carrera "+carrera.getNombre_carrera()+" ya se encuentra en la base de datos");
				return null;
			} else {
				carrera.setId(this.getIdUltimaCarrera()+1);
				em.getTransaction().begin();
				em.persist(carrera);
				em.getTransaction().commit();
				return carrera;
			}

		} catch (Exception e) {
			throw new RuntimeException("Error", e);
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	/**Actualiza la carrera en la base de datos
	 * @param carrera se pasa el objeto que va a permitir referenciar con la carrera que se espera actualizar
	 * */
	@Override
	public void update(Carrera carrera) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			em.getTransaction().begin();
			carrera = em.merge(carrera);
			em.getTransaction().commit();
		} catch (Exception e) {
			if (em.find(carrera.getClass(), carrera.getId()) != null ) {
				System.out.println("La carrera "+carrera.getNombre_carrera()+" no existe en la base de datos");
			}
			throw e;
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	/**Borra la carrera por medio del id de carrera 
	 * @param id identificador de carrera
	 * */
	@Override
	public void delete(Integer id) {
		EntityManager em = null;
		try {
			em = EMF.createEntityManager();
			em.getTransaction().begin();
			Carrera carrera = null;
			try {
				carrera = em.getReference(Carrera.class, id);
				carrera.getId();
			} catch (Exception e) {
				System.out.println("Error al eliminar la carrera id: "+id);
			}
			em.remove(carrera);
			em.getTransaction().commit(); 
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	
	
	/** Este metodo obtiene todas las carreras
	 * @return listado de carreras*/
	@Override
	public List<Carrera> getALL(){
		EntityManager em = EMF.createEntityManager();
		Query q = em.createNativeQuery("select c.* from Carrera c", Carrera.class);
		List<Carrera> listado = q.getResultList();
		em.close();
		return listado;
	}
	
	
	
	/**Obtiene la carrera por su id
	 * @param id identificador de carrera para buscarlo en la base de datos
	 * @return em.find devuelve el resultado de la busqueda de la carrera */
	@Override
	public Carrera getId(Integer id) {
		EntityManager em = EMF.createEntityManager();
		try {
			return em.find(Carrera.class, id);
		} finally {
			em.close();
		}
	}
	
	/**
	 * Obtiene la carrera por nombre de carrera
	 * @param nombreCarrera contiene el nombre de carrera que se esta buscando 
	 * @return listado.get(0) obtiene la primer carrera encontrada con ese nombre*/
	public Carrera getCarreraNombre(String nombreCarrera) {
		EntityManager em = EMF.createEntityManager();
		List<Carrera> listado = em.createQuery("SELECT C FROM Carrera C WHERE C.nombre_carrera =:nombre ", Carrera.class)
				.setParameter("nombre", nombreCarrera)
				.getResultList();
		em.close();
		if (listado.size() == 0) {
			return null;
		} else {
			return listado.get(0);		
		}
	
	}
	/** Este metodo obtiene las carreras ordenadas por cantidad de estudiantes sin distinguir entre los recibidos y no recibidos. Cantidad estudiantes totales
	 * @return listado listado de carreras ordenadad por estudiantes*/
	public List<Carrera> getCarrerasOrdCantEstudiantes(){
		EntityManager em = EMF.createEntityManager();
		Query q = em.createNativeQuery("select c.* from Carrera c \r\n" + 
				"inner join Matricula m ON c.id = m.id_carrera\r\n" + 
				"group by c.id\r\n" + 
				"order by count(m.id_estudiante) desc ", Carrera.class);
		List<Carrera> listado = q.getResultList();
		em.close();
		return listado;
	}
	
	


}
