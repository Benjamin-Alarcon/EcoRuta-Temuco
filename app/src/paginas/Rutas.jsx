import { useState } from "react";
import ListaUbicaciones from "../components/ListaUbicaciones.jsx";
import { ubicaciones } from "../datos/listaubicaciones.js";

export default function Rutas() {
  const [dificultad, setDificultad] = useState("todas");

  const visibles =
    dificultad === "todas"
      ? ubicaciones
      : ubicaciones.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <section className="contenido">
      <h1>Rutas y senderos</h1>

      <div className="filtros">
        {["todas", "baja", "media", "alta"].map((opcion) => (
          <button
            key={opcion}
            type="button"
            className="filtro"
            aria-pressed={dificultad === opcion}
            onClick={() => setDificultad(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      <ListaUbicaciones ubicaciones={visibles} titulo="Rutas y senderos" />
    </section>
  );
}