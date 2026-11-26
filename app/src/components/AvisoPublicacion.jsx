import { EN_PUBLICACION } from "../api.js";

export default function AvisoPublicacion() {
  if (!EN_PUBLICACION) return null;

  return (
    <aside className="aviso-publicacion" role="note" aria-label="Versión publicada">
      <strong>Estás viendo la versión publicada.</strong> Las rutas, los
      emprendimientos y los mensajes de la API propia están disponibles al
      ejecutar la aplicación en local. En Destinos puedes consultar ubicaciones
      en OpenStreetMap.
    </aside>
  );
}
