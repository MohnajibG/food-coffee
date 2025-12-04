import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Traiteur from "./pages/Traiteur";
import Cafeterias from "./pages/Cafeterias";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traiteur" element={<Traiteur />} />
            <Route path="/cafeterias" element={<Cafeterias />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
