import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Countdown from "./components/Countdown";
import Footer from "./components/shared/Footer";
import Sedes from "./pages/Sedes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#060a10]">
        <Routes>
          <Route path="/" element={<Countdown />} />
          <Route path="/sedes" element={<Sedes />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
