import { useEffect, useState } from "react";

const NOMINATIM_URL = (
  import.meta.env.VITE_NOMINATIM_URL || "https://nominatim.openstreetmap.org"
).replace(/\/$/, "");
const DESTINOS = [
  "Cerro Ñielol",
  "Parque Nacional Huerquehue",
  "Parque Nacional Conguillío",
  "Volcán Villarrica",
  "Nevados de Sollipulli",
];
const cacheLugares = new Map();
let ultimaSolicitud = 0;

function esperarIntervalo(minimoMs) {
  const ahora = Date.now();
  const espera = Math.max(0, minimoMs - (ahora - ultimaSolicitud));
  return new Promise((resolve) => setTimeout(resolve, espera));
}

async function buscarDestino(destino, signal) {
  if (cacheLugares.has(destino)) return cacheLugares.get(destino);

  await esperarIntervalo(1100);
  if (signal.aborted) throw new DOMException("Búsqueda cancelada", "AbortError");
  ultimaSolicitud = Date.now();

  const parametros = new URLSearchParams({
    format: "jsonv2",
    countrycodes: "cl",
    q: `${destino}, Región de La Araucanía, Chile`,
    limit: "5",
  });
  const respuesta = await fetch(`${NOMINATIM_URL}/search?${parametros}`, { signal });
  if (!respuesta.ok) throw new Error(`La API respondió ${respuesta.status}`);

  const datos = await respuesta.json();
  const lugares = Array.isArray(datos) ? datos : [];
  cacheLugares.set(destino, lugares);
  return lugares;
}

export default function PuntosInteresOSM() {
  const [destino, setDestino] = useState(DESTINOS[0]);
  const [busqueda, setBusqueda] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [destinoMostrado, setDestinoMostrado] = useState("");

  useEffect(() => {
    if (!busqueda) return undefined;

    const controlador = new AbortController();
    let activo = true;

    buscarDestino(busqueda.destino, controlador.signal)
      .then((datos) => {
        if (activo) setLugares(datos);
      })
      .catch((fallo) => {
        if (activo && fallo.name !== "AbortError") {
          setError("No se pudieron cargar los lugares de OpenStreetMap.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
      controlador.abort();
    };
  }, [busqueda]);

  function cambiarDestino(evento) {
    setDestino(evento.target.value);
    setBusqueda(null);
    setDestinoMostrado("");
    setLugares([]);
    setError("");
    setCargando(false);
  }

  return (
    <section aria-labelledby="titulo-osm">
      <h2 id="titulo-osm">Lugares en OpenStreetMap</h2>
      <div className="busqueda-destino">
        <label htmlFor="destino-osm">Elige un destino público de EcoRuta</label>
        <select id="destino-osm" value={destino} onChange={cambiarDestino}>
          {DESTINOS.map((opcion) => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
        <button
          className="boton"
          type="button"
          onClick={() => {
            setError("");
            setLugares([]);
            setDestinoMostrado(destino);
            setCargando(true);
            setBusqueda({ destino, id: Date.now() });
          }}
          disabled={cargando}
        >
          Buscar ubicación
        </button>
      </div>

      {cargando && (
        <p className="lista estado" role="status">Buscando lugares…</p>
      )}
      {error && <p className="lista estado error" role="alert">{error}</p>}
      {!cargando && !error && destinoMostrado && lugares.length === 0 && (
        <p className="sin-resultados" role="status">No se encontraron lugares para {destinoMostrado}.</p>
      )}
      {!cargando && !error && lugares.length > 0 && (
        <>
          <div className="puntos-osm">
            {lugares.map((lugar) => {
              const lat = Number(lugar.lat);
              const lon = Number(lugar.lon);
              const enlace = lugar.osm_type && lugar.osm_id
                ? `https://www.openstreetmap.org/${lugar.osm_type}/${lugar.osm_id}`
                : `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
              return (
                <article className="tarjeta tarjeta-osm" key={`${lugar.osm_type}-${lugar.osm_id}`}>
                  <div className="tarjeta-texto">
                    <h3>{lugar.name || lugar.display_name?.split(",")[0]}</h3>
                    <p>{lugar.display_name}</p>
                    <a href={enlace} target="_blank" rel="noreferrer">Ver en OpenStreetMap</a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="puntos-osm-atribucion">
            Datos ©{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
              OpenStreetMap contributors
            </a>
            , disponibles bajo licencia ODbL.
          </p>
        </>
      )}
    </section>
  );
}
