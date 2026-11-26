import { useEffect, useState } from "react";

const OSM_API_URL = "https://nominatim.openstreetmap.org";
const CONSULTA = "Cerro Ñielol, Temuco";
const LIMITE = 3;
let consultaOSM = null;

function obtenerLugares() {
  if (!consultaOSM) {
    const parametros = new URLSearchParams({
      format: "jsonv2",
      countrycodes: "cl",
      q: CONSULTA,
      limit: String(LIMITE),
    });

    consultaOSM = fetch(`${OSM_API_URL}/search?${parametros}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        return respuesta.json();
      })
      .then((datos) => (Array.isArray(datos) ? datos : []))
      .catch((error) => {
        consultaOSM = null;
        throw error;
      });
  }

  return consultaOSM;
}

export default function PuntosInteresOSM() {
  const [lugares, setLugares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    obtenerLugares()
      .then((datos) => {
        if (activo) setLugares(datos);
      })
      .catch(() => {
        if (activo) setError("No se pudieron cargar los lugares de OpenStreetMap.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section aria-labelledby="titulo-osm">
      <h2 id="titulo-osm">Lugares en OpenStreetMap</h2>

      {cargando && (
        <p className="lista estado" role="status">
          Buscando lugares…
        </p>
      )}

      {error && (
        <p className="lista estado error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && lugares.length === 0 && (
        <p className="sin-resultados">No hay lugares para mostrar.</p>
      )}

      {!cargando && !error && lugares.length > 0 && (
        <>
          <div className="puntos-osm">
            {lugares.map((lugar) => {
              const lat = Number(lugar.lat);
              const lon = Number(lugar.lon);
              const enlace = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;

              return (
                <article
                  className="tarjeta tarjeta-osm"
                  key={`${lugar.osm_type}-${lugar.osm_id}`}
                >
                  <div className="tarjeta-texto">
                    <h3>{lugar.name || lugar.display_name?.split(",")[0]}</h3>
                    <p>{lugar.display_name}</p>
                    <p className="puntos-osm-coords">
                      {lat.toFixed(4)}, {lon.toFixed(4)}
                    </p>
                    <a href={enlace} target="_blank" rel="noreferrer">
                      Ver en OpenStreetMap
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="puntos-osm-atribucion">
            Datos ©{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noreferrer"
            >
              OpenStreetMap contributors
            </a>
            , disponibles bajo licencia ODbL.
          </p>
        </>
      )}
    </section>
  );
}
