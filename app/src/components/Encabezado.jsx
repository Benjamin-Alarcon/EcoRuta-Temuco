import { Link, NavLink } from "react-router";
import logoEcoruta from "../assets/logoEcoruta.png";

const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Rutas", ruta: "/rutas" },
  { texto: "Destinos", ruta: "/destinos" },
  { texto: "Experiencias", ruta: "/experiencias" },
  { texto: "Emprendimientos", ruta: "/emprendimientos" },
  { texto: "Packs", ruta: "/packs" },
  { texto: "Nosotros", ruta: "/nosotros" },
  { texto: "Contacto", ruta: "/contacto" },
];
export default function Encabezado() {
  return (
    <header>
      <nav id="cont-nav" aria-label="Navegación principal">
        <Link to="/" id="logo-link">
          <img src={logoEcoruta} alt="Logo EcoRuta Temuco" id="logo" />
        </Link>

        <input type="checkbox" id="menu-toggle" hidden />

        <label
          htmlFor="menu-toggle"
          id="menu-boton"
          role="button"
          aria-label="Abrir menú de navegación"
          aria-controls="nav-lista"
        >
          &#9776;
        </label>

        <ul id="nav-lista" role="list">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta} className="boton-nav">
              <NavLink
                to={enlace.ruta}
                end={enlace.ruta === "/"}
                className={({ isActive }) => (isActive ? "activo" : "")}
              >
                {enlace.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}