import PuntosInteresOSM from "../components/PuntosInteresOSM.jsx";

export default function Destinos() {
  return (
    <section className="contenido">
      <h1>Destinos</h1>
      <p>
        Explora los lugares de La Araucanía y consulta su ubicación en el mapa de
        OpenStreetMap.
      </p>
      <PuntosInteresOSM />
    </section>
  );
}
