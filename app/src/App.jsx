import { Routes, Route } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./paginas/Inicio.jsx";
import Rutas from "./paginas/Rutas.jsx";
import DetalleRuta from "./paginas/DetalleRuta.jsx";
import Destinos from "./paginas/Destinos.jsx";
import Experiencias from "./paginas/Experiencias.jsx";
import Emprendimientos from "./paginas/Emprendimientos.jsx";
import Packs from "./paginas/Packs.jsx";
import Nosotros from "./paginas/Nosotros.jsx";
import Contacto from "./paginas/Contacto.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";

function App() {
  return (
    <>
      <Encabezado
        enlaces={["Inicio", "Rutas", "Destinos", "Experiencias", "Emprendimientos", "Packs", "Nosotros", "Contacto",
        ]}
        paginaActual="Inicio"
      />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/rutas/:id" element={<DetalleRuta />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <PiePagina />
    </>
  );
}

export default App;