import { useEffect, useState } from "react";
import { API_URL } from "../api.js";
import ListaUbicaciones from "../components/ListaUbicaciones.jsx";

const DIFICULTADES = ["todas", "baja", "media", "alta"];

function rutaParaTarjeta(ruta) {
  return {
    id: ruta.id,
    nombre: ruta.nombre,
    imagen: `/${String(ruta.imagen).replace(/^\//, "")}`,
    alt: ruta.alt,
    tipo: ruta.dificultad,
    etiqueta: ruta.accesible ? "Accesible" : "No accesible",
    varianteEtiqueta: ruta.accesible ? "destacada" : "oferta",
    duracion: `${ruta.distanciaKm} km`,
  };
}

export default function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [dificultad, setDificultad] = useState("todas");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setRutas(Array.isArray(datos) ? datos : []);
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

  if (cargando) {
    return (
      <section className="contenido">
        <h1>Rutas y senderos</h1>
        <p className="lista estado" role="status">
          Cargando rutas…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="contenido">
        <h1>Rutas y senderos</h1>
        <p className="lista estado error" role="alert">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="contenido">
      <h1>Rutas y senderos</h1>

      <div className="filtros">
        {DIFICULTADES.map((opcion) => (
          <button
            key={opcion}
            type="button"
            className={`filtro${dificultad === opcion ? " activo" : ""}`}
            aria-pressed={dificultad === opcion}
            onClick={() => setDificultad(opcion)}
          >
            {opcion}
          </button>
        ))}
        <span aria-live="polite">{visibles.length} rutas</span>
      </div>

      <ListaUbicaciones
        ubicaciones={visibles.map(rutaParaTarjeta)}
        titulo="Rutas y senderos"
      />
    </section>
  );
}
