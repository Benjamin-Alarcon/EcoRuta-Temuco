import TarjetaUbicacion from "./TarjetaUbicacion.jsx";

export default function ListaUbicaciones({ ubicaciones, titulo = "Rutas destacadas" }) {
  return (
    <section id="experiencias" className="tours" aria-label={titulo}>
      {ubicaciones.map((ubicacion) => (
        <TarjetaUbicacion
          key={ubicacion.id}
          id={ubicacion.id}
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