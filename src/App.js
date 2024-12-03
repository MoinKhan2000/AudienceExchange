import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {


  return (
    <div className="relative bg-[white] h-screen overflow-x-hidden" >

      <header className="relative">
        <Navbar />
      </header>
      <main>
        <DynamicForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
