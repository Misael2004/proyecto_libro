import { useState } from "react";
import { motion } from "framer-motion";

const CreateBookModal = ({ isOpen, onClose, onCreate, setLocalFile }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [nationality, setNationality] = useState("");
  const [release, setRelease] = useState("");
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Para manejar el archivo de imagen

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setLocalFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author: { name: author, nationality },
      avaliable: available,
      release,
      url: imageFile, // Enviar el archivo de imagen
    };
    onCreate(newBook);
    // Reset form
    setTitle("");
    setDescription("");
    setAuthor("");
    setNationality("");
    setRelease("");
    setImageUrl(null);
    setImageFile(null);
  };

  return (
    isOpen && (
      <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      >
        <motion.div
           className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[600px] overflow-auto"
           initial={{ opacity: 0, y: "-50%" }} // Desliza desde arriba
           animate={{
             opacity: 1,
             y: "0%",
             transition: {
               type: "spring", // Añade un rebote suave
               stiffness: 100,
               damping: 12,
               duration: 0.6,
             },
           }}
           exit={{ opacity: 0, y: "50%", transition: { duration: 0.4 } }}
        >
         
          <form onSubmit={handleSubmit}>
            {/* Título */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Autor */}
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Autor
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nacionalidad */}
            <div className="mb-4">
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
                Nacionalidad
              </label>
              <input
                type="text"
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fecha de lanzamiento */}
            <div className="mb-4">
              <label
                htmlFor="release"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de lanzamiento
              </label>
              <input
                type="date"
                id="release"
                value={release}
                onChange={(e) => setRelease(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Imagen del libro */}
            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Imagen
              </label>
              <input
                type="file"
                id="imageUrl"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imageUrl && (
                <div className="mt-2 text-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Disponibilidad */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Disponible
              </span>
            </div>

            {/* Botones */}
            <div className="flex justify-between mt-4 gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg w-[50%] "
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-[50%]"
              >
                Crear
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )
  );
};

export default CreateBookModal;
