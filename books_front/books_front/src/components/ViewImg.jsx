import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";

export default function ViewImg({ setView, view }) {
  return (
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
        <img src={view} className="w-full h-full" />
      </motion.div>

      <button onClick={() => setView("")} className="absolute top-2 right-2">
        <IoIosCloseCircle color="red" size={40} />
      </button>
    </motion.div>
  );
}
