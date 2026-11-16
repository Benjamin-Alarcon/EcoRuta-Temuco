import { Link } from "react-router";
import ListaUbicaciones from "../components/ListaUbicaciones.jsx";
import TarjetaBienvenida from "../components/TarjetaBienvenida.jsx";
import { ubicaciones } from "../datos/listaubicaciones.js";

export default function Inicio() {
  return (
    <div className="contenido">
      <TarjetaBienvenida />

      <section aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados">Lugares destacados</h2>
        <ListaUbicaciones ubicaciones={ubicaciones.slice(0, 3)} />
        <Link to="/rutas" className="boton">
          Ver todas las rutas
        </Link>
      </section>
    </div>
  );
}
