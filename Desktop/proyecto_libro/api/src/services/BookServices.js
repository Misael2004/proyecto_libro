import { books } from "../utils/defaultBooks.js";

// Clase Autor
class Autor {
    constructor(nombre, nacionalidad) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }

    informacion() {
        return `Autor: ${this.nombre}, Nacionalidad: ${this.nacionalidad}`;
    }
}

// Clase Libro
class Libro {
    constructor(titulo, autor, anioPublicacion, disponibilidad = true) {
        this.titulo = titulo;
        this.autor = autor; // Instancia de Autor
        this.anioPublicacion = anioPublicacion;
        this.disponibilidad = disponibilidad;
    }

    informacion() {
        const disponibilidad = this.disponibilidad ? "Disponible" : "No disponible";
        return `Título: ${this.titulo}, ${this.autor.informacion()}, Año de publicación: ${this.anioPublicacion}, ${disponibilidad}`;
    }

    prestar() {
        if (this.disponibilidad) {
            this.disponibilidad = false;
            return `El libro '${this.titulo}' ha sido prestado.`;
        }
        return `El libro '${this.titulo}' no está disponible.`;
    }

    devolver() {
        if (!this.disponibilidad) {
            this.disponibilidad = true;
            return `El libro '${this.titulo}' ha sido devuelto.`;
        }
        return `El libro '${this.titulo}' ya estaba disponible.`;
    }
}

// Clase Biblioteca
class Biblioteca {
    constructor() {
        this.libros = books;
    }

    agregarLibro(libro) {
        this.libros.push(libro); 
    }

    listarLibros() {
        return this.libros;
    }

    buscarPorTitulo(titulo) {
        return this.libros.filter(libro => libro.titulo.toLowerCase() === titulo.toLowerCase())
            .map(libro => libro.informacion());
    }

    buscarPorAutor(nombreAutor) {
        return this.libros.filter(libro => libro.autor.nombre.toLowerCase() === nombreAutor.toLowerCase())
            .map(libro => libro.informacion());
    }

    librosDisponibles() {
        return this.libros.filter(libro => libro.disponibilidad)
    }
}


export const BookService = {
    BibliotecaService: new Biblioteca(),
    LibroService: new Libro(),
    AutorService: new Autor()
}