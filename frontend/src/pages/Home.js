import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Blockquote } from "flowbite-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-100 relative">
      <Header />

      <section
        className="relative w-full h-[100vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: `url('/hero.jpg')`, // Zdjecię zmienie jak znajde inne copyrights free i lepsze
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
        <section className="flex flex-col md:flex-row items-center w-full max-w-6xl mb-16">
          <div className="w-full md:w-1/2 h-64 bg-gray-300 flex items-center justify-center rounded-md">
            PHOTO
          </div>
          <div className="w-full md:w-1/2 bg-blue-100 h-64 p-6 rounded-md flex flex-col justify-center mt-6 md:mt-0 md:ml-6">
            <p className="text-2xl font-semibold text-gray-700">
              Odkryj przepisy na każdą okazję i stwórz listę zakupów w kilka
              sekund!
            </p>
          </div>
        </section>

        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Najpopularniejsze w tym tygodniu
        </h2>
        <section className="flex items-center gap-6 max-w-screen-lg mx-auto">
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
            &lt;
          </button>
          <div className="flex gap-8">
            {[...Array(3)].map((_, index) => (
              <article key={index} className="flex flex-col items-center">
                <div className="w-60 h-60 bg-gray-300 border-2 border-gray-600 rounded-md flex items-center justify-center">
                  Zdjęcie
                </div>
                <p className="mt-4 text-lg text-gray-800 font-medium">
                  Nazwa przepisu
                </p>
              </article>
            ))}
          </div>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
            &gt;
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
