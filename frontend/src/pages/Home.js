import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-amber-100">
      <Header />

      <main className="flex flex-col items-center flex-1 pt-20  ">
  <section className="flex  w-full h-80">
  <div className="flex items-center  w-full">
   
    <div className="w-1/3 h-full bg-gray-300  flex items-center justify-center">
      PHOTO
    </div>

    <div className="flex flex-col w-2/3 bg-blue-100 h-full p-6">
      <p className="text-xl font-semibold text-gray-700">
        Text lelum pom, elum fdsjf
      </p>
    </div>
  </div>
</section>


        <h2 className="text-3xl font-bold mb-8 text-gray-700">Najpopularniejsze w tym tygodniu</h2>
        <section className="flex items-center gap-6 max-w-screen-lg mx-auto mt-8">
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
            &lt;
          </button>
          <div className="flex gap-8">
            {[...Array(3)].map((_, index) => (
              <article key={index} className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-300 border-2 border-gray-600 flex items-center justify-center">
                  Zdjęcie
                </div>
                <p className="mt-2 text-sm text-gray-700">Nazwa</p>
              </article>
            ))}
          </div>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 text-lg">
            &gt;
          </button>
        </section>
      </main>

      <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
        © 2024 PrzepiSearch
      </footer>
    </div>
  );
};

export default Home;
