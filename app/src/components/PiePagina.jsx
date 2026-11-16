import { Link } from "react-router";
import instagram from "../assets/instagram.jpg";
import facebook from "../assets/facebook.jpg";

export default function PiePagina() {
  return (
    <footer id="contacto" className="pie">
      <div className="pie-contenedor">
        <nav className="pie-columna" aria-label="Redes sociales">
          <h2>Contáctanos</h2>
          <ul role="list">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="" className="icono-red" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="" className="icono-red" /> Facebook
              </a>
            </li>
          </ul>
        </nav>

        <nav className="pie-columna" aria-label="Enlaces del sitio">
          <h2>Explora</h2>
          <ul role="list">
            <li><Link to="/rutas">Rutas</Link></li>
            <li><Link to="/rutas">Senderos</Link></li>
            <li><Link to="/">Familia</Link></li>
            <li><Link to="/">Camping</Link></li>
            <li><Link to="/emprendimientos">Emprendimientos</Link></li>
          </ul>
        </nav>
      </div>

      <p className="copyright">EcoRuta Temuco</p>
    </footer>
  );
}