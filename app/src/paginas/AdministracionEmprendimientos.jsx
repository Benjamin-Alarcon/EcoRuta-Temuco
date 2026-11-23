import { useState } from "react";
import FormularioEmprendimiento from "../components/FormularioEmprendimiento.jsx";
import GestionEmprendimientos from "../components/GestionEmprendimientos.jsx";
import ListaMensajes from "../components/ListaMensajes.jsx";

export default function AdministracionEmprendimientos() {
  const [version, setVersion] = useState(0);

  return (
    <div className="contenido">
      <section className="encabezado-pagina" aria-labelledby="titulo-administracion">
        <span className="presentacion-lugar">EcoRuta Temuco</span>
        <h1 id="titulo-administracion">Administración</h1>
        <p>
          Crea y elimina emprendimientos usando la API propia. Los cambios se
          guardan en el servidor y se reflejan en el listado.
        </p>
      </section>

      <section className="rejilla" aria-label="Gestión de emprendimientos">
        <FormularioEmprendimiento onCreado={() => setVersion((actual) => actual + 1)} />
        <GestionEmprendimientos actualizar={version} />
      </section>

      <ListaMensajes />
    </div>
  );
}
