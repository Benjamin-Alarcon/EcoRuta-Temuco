export default function ListaUbicaciones({ ubicaciones }) {
  return (
    <section id="experiencias" className="tours" aria-label="Tours destacados">
      {ubicaciones.map((ubicacion) => (
        <article className="tarjeta" key={ubicacion.id}>
          <div className="tarjeta-img">
            <img src={ubicacion.imagen} alt={ubicacion.alt} />
            <div className="tarjeta-etiquetas">
              <span className="etiqueta etiqueta-tipo">{ubicacion.tipo}</span>
              <span className={'etiqueta etiqueta-' + ubicacion.varianteEtiqueta}>
                {ubicacion.etiqueta}
              </span>
            </div>
            <span className="etiqueta etiqueta-duracion">{ubicacion.duracion}</span>
          </div>
          <div className="tarjeta-texto">
            <h2>{ubicacion.nombre}</h2>
            <p>{ubicacion.tipo} · {ubicacion.duracion}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
