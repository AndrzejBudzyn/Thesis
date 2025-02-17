import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Blockquote } from "flowbite-react";
import { motion } from "framer-motion";
import axiosClient from "../axiosClient";


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
   
    const fetchRecipes = async () => {
      try {
        const response = await axiosClient("/recommendation");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Nie udało się pobrać przepisów.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-amber-100 relative">
      <Header />

      <section
        className="relative w-full h-[100vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: `url('/hero.jpg')`, // Zmień obraz na odpowiedni
        }}
      >
        <img
          src="/circle.svg"
          className="absolute top-100 left-96 w-40 h-40 opacity-40 pointer-events-none"
        />
        <img
          src="/circle.svg"
          className="absolute bottom-20 right-20 w-60 h-60 opacity-10 pointer-events-none"
        />

        <motion.div
          initial={{ y: "20vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
          className="bg-black bg-opacity-50 p-8 rounded-lg text-center max-w-4xl"
        >
          <h1 className="text-5xl font-bold mb-4">
            Witamy w <span className="text-orange-500">Przepisi</span>
          </h1>
          <Blockquote className="text-center text-white mt-5 mb-5">
            „Dobre jedzenie to podstawa każdego udanego spotkania. Odkryj, jak
            łatwo stworzyć coś wyjątkowego z Przepisi.”
          </Blockquote>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold"
          >
            Rozpocznij
          </motion.button>
        </motion.div>
      </section>

      <main className="flex flex-col items-center flex-1 pt-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Najpopularniejsze w tym tygodniu
        </h2>
        {loading ? (
          <p>Ładowanie...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <section className="flex items-center gap-6 max-w-screen-lg mx-auto">
            <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
              &lt;
            </button>
            <div className="flex gap-8">
              {recipes.map((recipe) => (
                <article key={recipe.id} className="flex flex-col items-center">
                  <div className="w-60 h-60 bg-gray-300 border-2 border-gray-600 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={recipe.photo || "/placeholder.jpg"}
                      alt={recipe.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="mt-4 text-lg text-gray-800 font-medium">
                    {recipe.name}
                  </p>
                </article>
              ))}
            </div>
            <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
              &gt;
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
