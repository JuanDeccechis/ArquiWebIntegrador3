package edu.isistan.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.SqlResultSetMapping;

import edu.isistan.entidad.Carrera;
import edu.isistan.entidad.Estudiante;

public class DTOEstudiante {

	private int lu;
	private String nombre;
	private String apellido;
	private int edad;
	private String genero;
	private int dni;
	private String ciudad_residencia;
	private List<Carrera> carreras;
	
	public int getLu() {
		return lu;
	}
	public void setLu(int lu) {
		this.lu = lu;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public int getEdad() {
		return edad;
	}
	public void setEdad(int edad) {
		this.edad = edad;
	}
	public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public int getDni() {
		return dni;
	}
	public void setDni(int dni) {
		this.dni = dni;
	}
	public String getCiudad_residencia() {
		return ciudad_residencia;
	}
	public void setCiudad_residencia(String ciudad_residencia) {
		this.ciudad_residencia = ciudad_residencia;
	}
	
		
	public List<Carrera> getCarreras() {
		return carreras;
	}
	public void setCarreras(List<Carrera> carreras) {
		this.carreras = carreras;
	}
	
	public DTOEstudiante(int lu, String nombre, String apellido, int edad, String genero, int dni,
			String ciudad_residencia, List<Carrera> carreras) {
		super();
		this.lu = lu;
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.genero = genero;
		this.dni = dni;
		this.ciudad_residencia = ciudad_residencia;
		this.carreras = carreras;
	}
	public DTOEstudiante() {
		super();
	}
	
	
	
	
}
