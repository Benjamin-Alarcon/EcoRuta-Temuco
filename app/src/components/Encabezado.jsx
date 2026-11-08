import logoEcoruta from "../assets/logoEcoruta.png";
export default function Encabezado(){
    return <header>
        <nav id="cont-nav" aria-label="Navegación principal">
            <a href="index.html" id="logo-link">
                <img src={logoEcoruta} alt="Logo EcoRuta Temuco" id="logo"/>
            </a>

            <input type="checkbox" id="menu-toggle" hidden/>

            <label htmlfor="menu-toggle" id="menu-boton" role="button" aria-label="Abrir menú de navegación" aria-controls="nav-lista">&#9776;</label>

            <ul id="nav-lista" role="list">
                <li className="boton-nav"><a href="#inicio" aria-current="page">Inicio</a></li>
                <li className="boton-nav"><a href="html/rutas.html">Rutas</a></li>
                <li className="boton-nav"><a href="html/destinos.html">Destinos</a></li>
                <li className="boton-nav"><a href="#experiencias">Experiencias</a></li>
                <li className="boton-nav"><a href="html/emprendimientos.html">Emprendimientos</a></li>
                <li className="boton-nav"><a href="#packs">Packs</a></li>
                <li className="boton-nav"><a href="html/nosotros.html">Nosotros</a></li>
                <li className="boton-nav"><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>;
}