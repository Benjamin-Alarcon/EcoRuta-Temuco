import TarjetaUbicacion from "./TarjetaUbicacion.jsx";

export default function ListaUbicaciones({ ubicaciones }) {
  return (
    <section id="experiencias" className="tours" aria-label="Tours destacados">
      {ubicaciones.map((ubicacion) => (
        <TarjetaUbicacion
          key={ubicacion.id}
          nombre={ubicacion.nombre}
          imagen={ubicacion.imagen}
          alt={ubicacion.alt}
          tipo={ubicacion.tipo}
          etiqueta={ubicacion.etiqueta}
          varianteEtiqueta={ubicacion.varianteEtiqueta}
          duracion={ubicacion.duracion}
        />
      ))}
    </section>
  );
}