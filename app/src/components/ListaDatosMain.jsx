export default function ListaDatosMain({ datos }) {
   return (
      <section className="datos" aria-label="EcoRuta en números">
         {datos.map((dato) => (
            <div className="caja" key={dato.id}>
               <strong>{dato.valor}</strong>
               <span>{dato.descripcion}</span>
            </div>
         ))}
      </section>
   );
}