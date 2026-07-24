import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Sites from "./pages/Sites";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sites" element={<Sites />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
