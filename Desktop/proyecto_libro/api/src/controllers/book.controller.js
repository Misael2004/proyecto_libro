import { BookService } from "../services/BookServices.js"
import { errorResponse } from "../utils/ErrorRespose.js"
import { response } from "../utils/response.js"

const { AutorService, LibroService, BibliotecaService } = BookService

export const getAllBooks = (req, res) => {
    try {
        const data = BibliotecaService.listarLibros()
        // throw new Error('Algo salio mal')
        response(res, 200, data)
    } catch (error) {
        errorResponse(res, 400, error.message)
    }
}

export const availableBooks = (req, res) => {
    try {
        const data = BibliotecaService.librosDisponibles()
        response(res, 200, data)
    } catch (error) {
        errorResponse(res, 400, error.message)
    }
}