import { useEffect, useState } from "react";
import { API_URL } from "../api.js";

export default function ListaMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarMensajes() {
      try {
        const respuesta = await fetch(`${API_URL}/mensajes`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (activo) setMensajes(Array.isArray(datos) ? datos : []);
      } catch {
        if (activo) {
          setError("No se pudieron cargar los mensajes. ¿Está corriendo la API?");
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarMensajes();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <section className="gestion-emprendimientos" aria-labelledby="titulo-mensajes">
      <h3 id="titulo-mensajes">Mensajes recibidos</h3>

      {cargando && (
        <p className="estado" role="status">
          Cargando mensajes…
        </p>
      )}

      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <ul>
          {mensajes.map((mensaje) => (
            <li key={mensaje.id} className="emprendimiento-admin">
              <strong>{mensaje.asunto}</strong> <span>{mensaje.nombre}</span>
              <p>{mensaje.contenido}</p>
              <p>
                {mensaje.correo} · {mensaje.fecha}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
