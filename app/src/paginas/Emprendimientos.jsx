import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";

export default function Emprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarEmprendimientos() {
      try {
        const respuesta = await fetch(`${API_URL}/emprendimientos`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setEmprendimientos(Array.isArray(datos) ? datos : []);
      } catch {
        setError(
          "No se pudieron cargar los emprendimientos. ¿Está corriendo la API?",
        );
      } finally {
        setCargando(false);
      }
    }
    cargarEmprendimientos();
  }, []);

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando emprendimientos…
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
      <section className="encabezado-pagina" aria-labelledby="titulo-emprendimientos">
        <span className="presentacion-lugar">La Araucanía, Chile</span>
        <h1 id="titulo-emprendimientos">Emprendimientos locales</h1>
        <p>
          Artesanía, textiles y oficios de la región. Apoya a talleres y cooperativas
          que mantienen viva la cultura de La Araucanía.
        </p>
      </section>

      <section className="filtros" aria-label="Resumen de emprendimientos">
        <span aria-live="polite">
          {emprendimientos.length}{" "}
          {emprendimientos.length === 1 ? "emprendimiento" : "emprendimientos"}
        </span>
      </section>

      <section className="rejilla" aria-label="Listado de emprendimientos">
        {emprendimientos.map((emprendimiento) => (
          <article key={emprendimiento.id} className="tarjeta tarjeta-emprendimiento">
            <div className="tarjeta-cuerpo">
              <h2>{emprendimiento.nombre}</h2>
              <p>{emprendimiento.descripcion}</p>
              <dl className="ficha">
                <div>
                  <dt>Correo:</dt>{" "}
                  <dd>
                    <a href={`mailto:${emprendimiento.correo}`}>
                      {emprendimiento.correo}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Número:</dt> <dd>{emprendimiento.numero}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>

      <section className="mensaje">
        <h2>¿Tienes un emprendimiento local?</h2>
        <p>
          Si tienes un taller, cooperativa o pyme en La Araucanía y quieres sumarte a
          EcoRuta Temuco, revisa el estado de nuestro canal de contacto.
        </p>
        <Link to="/contacto" className="boton">
          Ver Contacto
        </Link>
      </section>
    </div>
  );
}
