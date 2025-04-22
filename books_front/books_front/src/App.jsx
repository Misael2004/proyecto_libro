import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import AuthorDesc from "./components/AuthorDesc.jsx";

function App() {
  return (
    <div className="max-w-[1000px] overflow-hidden m-auto pt-6">
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Hero />} />
        {/* Ruta para libros */}
        {/* <Route
          path="/books"
          element={
            <Cards
              books={books.map((book) => ({
                ...book,
                url: `${baseUrl}/${book.url}`,
              }))}
            />
          }
        /> */}
        {/* Ruta para autores */}
        {/* <Route
          path="/authors"
          element={
            <CardAuthor
              authors={authors.map((author) => ({
                ...author,
                img: `${baseUrl}/${author.img}`,
              }))}
            />
          }
        /> */}
        {/* Ruta específica para "/name" */}
        <Route path="/:name" element={<AuthorDesc />} />
        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
              <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
              <p className="text-2xl mb-8">Página no encontrada</p>
              <a
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg transition duration-300"
              >
                Volver al Inicio
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
