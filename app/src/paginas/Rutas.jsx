import { useState } from "react";

const rutas = [
  { id: 1, nombre: "Cerro Ñielol", dificultad: "baja" },
  { id: 2, nombre: "Parque Nacional Huerquehue", dificultad: "media" },
  { id: 3, nombre: "Parque Nacional Conguillío", dificultad: "alta" },
  { id: 4, nombre: "Volcán Villarrica", dificultad: "alta" },
];

export default function Rutas() {
  const [dificultad, setDificultad] = useState("todas");

  const visibles = dificultad === "todas"
    ? rutas
    : rutas.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <section>
      <h1>Rutas y senderos</h1>

      <div className="filtros">
        {["todas", "baja", "media", "alta"].map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={dificultad === opcion}
            onClick={() => setDificultad(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      <ul>
        {visibles.map((ruta) => (
          <li key={ruta.id}>{ruta.nombre} — {ruta.dificultad}</li>
        ))}
      </ul>
    </section>
  );
}