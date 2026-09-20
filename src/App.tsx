import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import CursorTrail from "./components/CursorTrail/CursorTrail";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Sites from "./pages/Sites/Sites";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <CursorTrail />
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
