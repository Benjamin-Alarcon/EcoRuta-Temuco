import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../api.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [noEncontrada, setNoEncontrada] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarRuta() {
      try {
        setCargando(true);
        setError("");
        setNoEncontrada(false);

        const respuesta = await fetch(`${API_URL}/rutas/${id}`);
        if (respuesta.status === 404) {
          if (activo) setNoEncontrada(true);
          return;
        }
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        if (activo) setRuta(datos);
      } catch {
        if (activo) {
          setError("No se pudo cargar la ruta. ¿Está corriendo la API?");
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarRuta();
    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando ruta…
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

  if (noEncontrada || !ruta) {
    return (
      <p className="lista" role="status">
        Ruta no encontrada
      </p>
    );
  }

  return (
    <article className="tarjeta detalle">
      <div className="tarjeta-img">
        <img
          src={`/${String(ruta.imagen).replace(/^\//, "")}`}
          alt={ruta.alt}
        />
        <div className="tarjeta-etiquetas">
          <span className="etiqueta etiqueta-tipo">Dificultad {ruta.dificultad}</span>
          <span className="etiqueta etiqueta-destacada">
            {ruta.accesible ? "Accesible" : "No accesible"}
          </span>
        </div>
        <span className="etiqueta etiqueta-duracion">{ruta.distanciaKm} km</span>
      </div>
      <div className="tarjeta-texto">
        <h1>{ruta.nombre}</h1>
        <p>
          {ruta.distanciaKm} km · Dificultad {ruta.dificultad} ·{" "}
          {ruta.accesible ? "Accesible" : "No accesible"}
        </p>
        <p>{ruta.descripcion}</p>
        <Link to="/rutas" className="boton">
          Volver a rutas
        </Link>
      </div>
    </article>
  );
}
