export default function TarjetaUbicacion({
  nombre,
  imagen,
  alt,
  tipo,
  etiqueta,
  varianteEtiqueta,
  duracion,
}) {
  return (
    <article className="tarjeta">
      <div className="tarjeta-img">
        <img src={imagen} alt={alt} />
        <div className="tarjeta-etiquetas">
          <span className="etiqueta etiqueta-tipo">{tipo}</span>
          <span className={"etiqueta etiqueta-" + varianteEtiqueta}>{etiqueta}</span>
        </div>
        <span className="etiqueta etiqueta-duracion">{duracion}</span>
      </div>
      <div className="tarjeta-texto">
        <h2>{nombre}</h2>
        <p>{tipo} · {duracion}</p>
      </div>
    </article>
  );
}