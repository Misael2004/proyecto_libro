// src/App.jsx
import { useState, useEffect } from "react";
import Cards from "./Cards";
import CreateBookModal from "./CreateBookModal.jsx";
import { getAuthors } from "../middleware/authors.js";
import CardAuthor from "./CardAuthor";
import { envs } from "../config/envs.js";
import { ReactTyped } from "react-typed";

const api = envs.API;
const baseUrl = envs.BASE_API;

function Hero() {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentView, setCurrentView] = useState("books");
  const [authors, setAuthor] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(`${api}/biblioteca`, {
          method: "GET",
          "Content-Type": "application/json",
        });
        const { data } = await res.json();
        setBooks(data);
        setOriginalBooks(data);
      } catch (error) {
        console.log(error);
        setBooks([]);
      }
    };
    getBooks();
  }, []);

  const handleFilter = (input) => {
    const value = input.target.value;

    if (value === "author") {
      setCurrentView(value);
      return;
    }

    if (value === "books") {
      setCurrentView(value);
      return;
    }

    const copy = [...originalBooks];

    if (value === "available") {
      setBooks(copy.filter((e) => e.avaliable));
    } else if (value === "not-available") {
      setBooks(copy.filter((e) => !e.avaliable));
    } else {
      setBooks(copy);
    }
  };

  const handleCreateBook = async (newBook) => {
    let urlImg = "";
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${api}/upload`, {
        method: "POST",
        body: formData,
      });

      const { data } = await uploadRes.json();
      console.log(data);
      urlImg = data;
    } catch (error) {
      console.log("Error al subir la imagen:", error);
      return;
    }

    try {
      const bookData = {
        ...newBook,
        url: urlImg,
      };

      const createRes = await fetch(`${api}/biblioteca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const { data } = await createRes.json();

      setBooks((prev) => [data, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error al crear el libro:", error);
    }
  };

  useEffect(() => {
    if (currentView && currentView === "author") {
      getAuthors().then((res) => {
        setAuthor(res);
      });
    }
  }, [currentView]);

  if (!authors?.length && !books?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
          Cargando...
          <br />
          <small></small>
          <ReactTyped
            strings={[
  "Creado con cariño por Misael 💻✨",
  "¡Un momento, por favor! ❤️",
  "El servidor está descansando... necesita volver a activarse 💤🔄",
  "¡Encendiendo motores! 🚀😊",
  "Esto podría tardar un poquito más... ¡Gracias por tu paciencia! ⏳🤐",
  "¡Ya casi lo tenemos! 👌🔥",
  "Esto pasa porque usamos una instancia gratuita 💸🧠"
]}
            typeSpeed={60} // Ajustar para suavizar
            backSpeed={20} // Ajustar para suavizar
            loop
          />
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] overflow-hidden m-auto ">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
        <span className="text-blue-500">Librería</span> Universidad{" "}
        <span className="text-blue-500">O&M</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 bg-white dark:bg-gray-800 md:rounded-lg shadow-md">
        <label
          className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto mb-4 md:mb-0"
          htmlFor="filter"
        >
          <span className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
            Filtro:
          </span>
          <select
            onChange={handleFilter}
            className="w-full md:w-auto p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition duration-300"
            name="filter"
            id="filter"
          >
            <option disabled={currentView === "author"} value="all">
              Todos
            </option>
            <option disabled={currentView === "author"} value="available">
              Disponibles
            </option>
            <option disabled={currentView === "author"} value="not-available">
              No disponibles
            </option>
            <option value="author">Autores</option>
            <option value="books">Libros</option>
          </select>
        </label>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-purple-400 transition-transform transform hover:scale-105"
        >
          Crear nuevo libro
        </button>
      </div>

      {currentView === "books" ? (
        <Cards
          books={books.map((e) => {
            return { ...e, url: `${baseUrl}/${e.url}` };
          })}
        />
      ) : (
        <CardAuthor
          authors={authors?.map((e) => {
            return {
              ...e,
              img: `${baseUrl}/${e.img}`,
            };
          })}
        />
      )}

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBook}
        setLocalFile={setFile}
      />
    </div>
  );
}

export default Hero;
