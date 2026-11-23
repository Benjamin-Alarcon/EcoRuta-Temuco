import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";
import ListaUbicaciones from "../components/ListaUbicaciones.jsx";
import TarjetaBienvenida from "../components/TarjetaBienvenida.jsx";

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

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando rutas…
      </p>
    );
  }

  if (error) {
    return (
      <p className="lista estado error" role="alert">
        {error}
      </p>
    );
  }

  return (
    <div className="contenido">
      <TarjetaBienvenida />

      <section aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados">Lugares destacados</h2>
        <ListaUbicaciones ubicaciones={rutas.slice(0, 3).map(rutaParaTarjeta)} />
        <Link to="/rutas" className="boton">
          Ver todas las rutas
        </Link>
      </section>
    </div>
  );
}
