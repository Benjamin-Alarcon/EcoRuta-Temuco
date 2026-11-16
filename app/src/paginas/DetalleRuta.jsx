import { Link, useParams } from "react-router";
import { ubicaciones } from "../datos/listaubicaciones.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const ruta = ubicaciones.find((r) => r.id === Number(id));

  if (!ruta) {
    return <p className="lista">No existe una ruta con el número {id}.</p>;
  }

  return (
    <article className="tarjeta">
      <div className="tarjeta-img">
        <img src={ruta.imagen} alt={ruta.alt} />
        <div className="tarjeta-etiquetas">
          <span className="etiqueta etiqueta-tipo">{ruta.tipo}</span>
          <span className={"etiqueta etiqueta-" + ruta.varianteEtiqueta}>
            {ruta.etiqueta}
          </span>
        </div>
        <span className="etiqueta etiqueta-duracion">{ruta.duracion}</span>
      </div>
      <div className="tarjeta-texto">
        <h1>{ruta.nombre}</h1>
        <p>
          {ruta.tipo} · {ruta.duracion}
        </p>
        <Link to="/rutas" className="boton">
          Volver a rutas
        </Link>
      </div>
    </article>
  );
}
