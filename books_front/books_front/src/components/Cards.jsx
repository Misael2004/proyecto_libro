import { motion } from "framer-motion";
import { useState } from "react";
import ViewImg from "./ViewImg";
import {envs} from '../config/envs'

export default function Cards({ books }) {
  const [view, setView] = useState("");

  const handleView = (url) => {
    setView(url);
  };

    const imgFn = (url) => {
      console.log(`${envs.BASE_API}/${url}`)
retun `${envs.BASE_API}/${url}`
    }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {books?.map((book, index) => (
          <motion.div
            onClick={() => handleView(`${envs.BASE_API}/${book?.url}`)}
            key={index}
            className="max-w-sm rounded-lg overflow-hidden bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: index * 0.1 },
            }}
            viewport={{ once: true }} // Se anima solo cuando entra una vez en el viewport
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={`${envs.BASE_API}/${book?.url}`}
              alt={book?.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {book?.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{book?.description}</p>
              <div className="mt-4">
                <p className="text-gray-500 text-xs">
                  <strong>Autor:</strong> {book?.autor?.name}
                </p>
                <p className="text-gray-500 text-xs">
                  <strong>Nacionalidad:</strong> {book?.autor?.nationality}
                </p>
                <p className="text-gray-500 text-xs">
                  <strong>Fecha de lanzamiento:</strong> {book?.release}
                </p>
                <p
                  className={`mt-2 text-xs ${
                    book?.avaliable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {book?.avaliable ? "Disponible" : "No disponible"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {view && <ViewImg setView={setView} view={view}/>}
    </>
  );
}
