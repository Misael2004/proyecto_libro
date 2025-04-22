import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewImg from "./ViewImg";
import {envs} from '../config/envs'

export default function CardAuthor({ authors }) {
  const navigate = useNavigate();
  const [view, setView] = useState("");

  const handleNavigate = (name) => {
    navigate(`/${name}`);
  };

  const handleView = (url) => {
    setView(url);
  };

  const imgFn = (url) => (`${envs.BASE_API}/${url}`)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {authors?.map((author, index) => (
          <motion.div
            key={index}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
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
              onClick={() => handleView(imgFn(author.img))}
              src={() => imgFn(author?.img)}
              alt={author?.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {author?.name}
              </h2>
              <span>Nacionalidad: {author.nationality}</span>
              <button
                onClick={() => handleNavigate(author.name)}
                className="p-2 rounded bg-green-500 w-full"
              >
                Ver Biografia
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {view && <ViewImg view={view} setView={setView} />}
    </>
  );
}
