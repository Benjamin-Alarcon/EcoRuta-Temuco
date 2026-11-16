import { useState } from "react";
import { Link } from "react-router";
import manosArtesanas from "../assets/mision-nosotros.jpg";
import tainPewman from "../../../img/tainpewman.jpg";
import laRueka from "../../../img/la-rueca.jpg";

const emprendimientos = [
  {
    id: 1,
    nombre: "Textilería Yovana Morales Huenchuman",
    tipo: "Textilería",
    comuna: "Temuco",
    imagen: manosArtesanas,
    alt: "Manos trabajando en un taller artesanal",
    descripcion:
      "Prendas y artículos decorativos en lana de oveja teñida con productos naturales. Cuenta con el Sello Manos Campesinas de INDAP.",
    ubicacion: "sector Monteverde, Temuco",
    contacto: "Mercado INDAP Araucanía",
    contactoUrl: "http://www.mercadoindaparaucania.cl/",
    ruta: "Cerro Ñielol",
  },
  {
    id: 2,
    nombre: "Cooperativa Taiñ Pewman",
    tipo: "Cooperativa",
    comuna: "Toltén",
    imagen: tainPewman,
    alt: "Logo representativo de la cooperativa Taiñ Pewman",
    descripcion:
      "Agrupación de artesanas textiles de Toltén que trabaja el telar y los tintes naturales, comercializando sus creaciones de forma colectiva.",
    ubicacion: "comuna de Toltén",
    contacto: "Artesanías de Chile",
    contactoUrl: "https://artesaniasdechile.cl/",
    ruta: "circuitos de La Araucanía",
  },
  {
    id: 3,
    nombre: "La Rueka Gestión Creativa",
    tipo: "Gestión creativa",
    comuna: "Pucón",
    imagen: laRueka,
    alt: "Personas posando con artesanía local",
    descripcion:
      "Agrupación que acompaña a mujeres artesanas del textil de Pucón, Villarrica y Loncoche con formación, catálogos y difusión de sus obras.",
    ubicacion: "Pucón, Villarrica y Loncoche",
    contacto: "larueka.com",
    contactoUrl: "https://larueka.com/",
    ruta: "Parque Nacional Huerquehue",
  },
];

const tipos = ["Todos", ...new Set(emprendimientos.map(({ tipo }) => tipo))];

export default function Emprendimientos() {
  const [tipo, setTipo] = useState("Todos");
  const visibles =
    tipo === "Todos"
      ? emprendimientos
      : emprendimientos.filter((emprendimiento) => emprendimiento.tipo === tipo);

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

      <section className="filtros" aria-label="Filtrar emprendimientos por tipo">
        <div className="filtros-grupo">
          <span className="filtros-etiqueta">Tipo:</span>
          {tipos.map((opcion) => (
            <button
              key={opcion}
              type="button"
              className={`filtro${tipo === opcion ? " activo" : ""}`}
              aria-pressed={tipo === opcion}
              onClick={() => setTipo(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
        <span aria-live="polite">
          {visibles.length} {visibles.length === 1 ? "emprendimiento" : "emprendimientos"}
        </span>
      </section>

      <section className="rejilla" aria-label="Listado de emprendimientos">
        {visibles.map((emprendimiento) => (
          <article key={emprendimiento.id} className="tarjeta tarjeta-emprendimiento">
            <div className="tarjeta-img">
              <img src={emprendimiento.imagen} alt={emprendimiento.alt} />
              <div className="tarjeta-etiquetas">
                <span className="etiqueta etiqueta-tipo">{emprendimiento.tipo}</span>
                <span className="etiqueta etiqueta-destacada">{emprendimiento.comuna}</span>
              </div>
            </div>
            <div className="tarjeta-cuerpo">
              <h2>{emprendimiento.nombre}</h2>
              <p>{emprendimiento.descripcion}</p>
              <dl className="ficha">
                <div>
                  <dt>Ubicación:</dt> <dd>{emprendimiento.ubicacion}</dd>
                </div>
                <div>
                  <dt>Contacto:</dt>{" "}
                  <dd>
                    <a
                      href={emprendimiento.contactoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {emprendimiento.contacto}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Ruta vinculada:</dt>{" "}
                  <dd>
                    <Link to="/rutas">{emprendimiento.ruta}</Link>
                  </dd>
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
