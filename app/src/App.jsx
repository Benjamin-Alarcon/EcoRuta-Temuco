import Encabezado from  "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaDatosMain from "./components/ListaDatosMain.jsx";
import ListaUbicaciones from "./components/ListaUbicaciones.jsx";
import TarjetaBienvenida from "./components/TarjetaBienvenida.jsx";
import {datos} from "./datos/listadatosmain.js";
import { ubicaciones } from "./datos/listaubicaciones.js";

function App(){
  return(
    <>
      <Encabezado
        enlaces={["Inicio", "Rutas", "Destinos", "Experiencias", "Emprendimientos", "Packs", "Nosotros", "Contacto"]}
      />
      <main>
        <TarjetaBienvenida
          titulo = "Vive la Araucania de una forma diferente"
          subtitulo = "Canopy, rafting, cabalgatas, paintball y más experiencias en pucon, villarica, temuco y alrededores"
        />
        <ListaDatosMain datos = {datos}/>
        <ListaUbicaciones ubicaciones = {ubicaciones} /> 
      </main>
      <PiePagina/>
    </>
  );
}


export default App;