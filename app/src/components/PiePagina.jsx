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
            <li><a href="/html/rutas.html">Rutas</a></li>
            <li><a href="/html/rutas.html">Senderos</a></li>
            <li><a href="/#experiencias">Familia</a></li>
            <li><a href="/#experiencias">Camping</a></li>
            <li><a href="/html/emprendimientos.html">Emprendimientos</a></li>
          </ul>
        </nav>
      </div>

      <p className="copyright">EcoRuta Temuco</p>
    </footer>
  );
}
