import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Countdown from "./components/Countdown";
import Footer from "./components/shared/Footer";
import Sedes from "./pages/Sedes";
import Navbar from "./components/shared/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , background: '#060a10'}}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Countdown />} />
            <Route path="/sedes" element={<Sedes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}