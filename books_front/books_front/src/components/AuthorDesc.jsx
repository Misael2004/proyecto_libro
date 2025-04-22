import { useEffect, useState } from "react";
import { getByName } from "../middleware/authors";
import { useNavigate, useParams } from "react-router-dom";
import { envs } from "../config/envs.js";
import { motion } from "framer-motion";

const baseApi = envs.BASE_API;

export default function AuthorDesc() {
  const { name } = useParams();
  const [author, setAuthor] = useState({});
  const navigate = useNavigate()

  console.log(name);
  useEffect(() => {
    if (name) {
      getByName(name).then((res) => setAuthor(res));
    }
  }, [name]);

  if (!author) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <>
    <div className="mb-8 text-center">
      <h3 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        Biografía
      </h3>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Descubre más sobre la vida y logros de {author.name}.
      </p>
    </div>
    <div className="text-center mb-8">
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-purple-400 transition-transform transform hover:scale-105"
      >
        Volver Atrás
      </button>
    </div>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} // Estado inicial
      animate={{ opacity: 1, scale: 1 }} // Animación al montar
      exit={{ opacity: 0, scale: 0.9 }} // Animación al desmontar
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={`${baseApi}/${author.img}`}
          alt={`Foto de ${author.name}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {author.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
            {author.nationality}
          </p>
        </div>
      </div>
      <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
        {author.biography}
      </p>
    </motion.div>
  </>
  
  );
}
