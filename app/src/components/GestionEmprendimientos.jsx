import { useEffect, useState } from "react";
import { API_URL } from "../api.js";

export default function GestionEmprendimientos({ actualizar = 0 }) {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [borrandoId, setBorrandoId] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarEmprendimientos() {
      try {
        setCargando(true);
        setError("");
        const respuesta = await fetch(`${API_URL}/emprendimientos`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (activo) setEmprendimientos(Array.isArray(datos) ? datos : []);
      } catch {
        if (activo) {
          setError(
            "No se pudieron cargar los emprendimientos. ¿Está corriendo la API?",
          );
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarEmprendimientos();
    return () => {
      activo = false;
    };
  }, [actualizar]);

  async function borrar(emprendimiento) {
    setError("");
    setMensaje("");
    setBorrandoId(emprendimiento.id);
    try {
      const respuesta = await fetch(
        `${API_URL}/emprendimientos/${emprendimiento.id}`,
        { method: "DELETE" },
      );
      if (!respuesta.ok) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      setEmprendimientos((actuales) =>
        actuales.filter((item) => item.id !== emprendimiento.id),
      );
      setMensaje(`Se borró "${emprendimiento.nombre}".`);
    } catch {
      setError(
        `No se pudo borrar "${emprendimiento.nombre}". Inténtalo de nuevo.`,
      );
    } finally {
      setBorrandoId(null);
    }
  }

  return (
    <section className="gestion-emprendimientos" aria-labelledby="titulo-gestion">
      <h3 id="titulo-gestion">Emprendimientos registrados</h3>

      {cargando && (
        <p className="estado" role="status">
          Cargando emprendimientos…
        </p>
      )}

      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {mensaje && (
        <p className="estado" role="status">
          {mensaje}
        </p>
      )}

      {!cargando && !error && (
        <ul>
          {emprendimientos.map((emprendimiento) => (
            <li key={emprendimiento.id} className="emprendimiento-admin">
              <strong>{emprendimiento.nombre}</strong> <span>{emprendimiento.correo}</span>
              <p>{emprendimiento.descripcion}</p>
              <p>Número: {emprendimiento.numero}</p>
              <button
                type="button"
                className="borrar"
                aria-label={`Borrar el emprendimiento ${emprendimiento.nombre}`}
                disabled={borrandoId === emprendimiento.id}
                onClick={() => borrar(emprendimiento)}
              >
                {borrandoId === emprendimiento.id ? "Borrando…" : "Borrar"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
