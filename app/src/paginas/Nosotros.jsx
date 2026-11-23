import { useState } from "react";
import { API_URL } from "../api.js";

const VACIO = { nombre: "", correo: "", asunto: "", contenido: "" };

export default function Nosotros() {
  const [formulario, setFormulario] = useState(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  function actualizar(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setMensaje("");

    const nombre = formulario.nombre.trim();
    const correo = formulario.correo.trim();
    const asunto = formulario.asunto.trim();
    const contenido = formulario.contenido.trim();

    if (!nombre || !correo || !asunto || !contenido) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError("Escribe un correo válido.");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          correo,
          asunto,
          contenido,
          fecha: new Date().toISOString().slice(0, 19),
        }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      const creado = await respuesta.json();
      setFormulario(VACIO);
      setMensaje(`Mensaje enviado con el id ${creado.id}.`);
    } catch {
      setError("No se pudo enviar el mensaje. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="contenido">
      <section className="encabezado-pagina" aria-labelledby="titulo-nosotros">
        <span className="presentacion-lugar">EcoRuta Temuco</span>
        <h1 id="titulo-nosotros">Nosotros</h1>
        <p>
          Somos un equipo dedicado a mostrar los caminos, la cultura y los
          emprendimientos de La Araucanía. Escríbenos y te responderemos.
        </p>
      </section>

      <form className="formulario" onSubmit={enviar} aria-labelledby="titulo-form-mensaje">
        <h4 id="titulo-form-mensaje">Envíanos un mensaje</h4>

        <label htmlFor="msg-nombre">Nombre</label>
        <input
          id="msg-nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={actualizar}
          required
        />

        <label htmlFor="msg-correo">Correo</label>
        <input
          id="msg-correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={actualizar}
          required
        />

        <label htmlFor="msg-asunto">Asunto</label>
        <input
          id="msg-asunto"
          name="asunto"
          type="text"
          value={formulario.asunto}
          onChange={actualizar}
          required
        />

        <label htmlFor="msg-contenido">Contenido</label>
        <textarea
          id="msg-contenido"
          name="contenido"
          rows="4"
          value={formulario.contenido}
          onChange={actualizar}
          required
        />

        <button className="boton" type="submit" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar mensaje"}
        </button>

        {error && (
          <p className="estado error" role="alert">
            {error}
          </p>
        )}
        {mensaje && (
          <p className="estado" role="status">
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}
