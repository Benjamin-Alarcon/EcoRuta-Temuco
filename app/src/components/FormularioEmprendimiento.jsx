import { useState } from "react";
import { API_URL } from "../api.js";

const VACIO = { nombre: "", correo: "", descripcion: "", numero: "" };

export default function FormularioEmprendimiento({ onCreado }) {
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
    const descripcion = formulario.descripcion.trim();
    const numero = Number(formulario.numero);

    if (!nombre || !correo || !descripcion || !formulario.numero) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError("Escribe un correo válido.");
      return;
    }
    if (!Number.isFinite(numero) || numero <= 0) {
      setError("El número debe ser un valor positivo.");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/emprendimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, descripcion, numero }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      const creado = await respuesta.json();
      setFormulario(VACIO);
      setMensaje(`Se creó "${creado.nombre}" con el id ${creado.id}.`);
      if (typeof onCreado === "function") onCreado(creado);
    } catch {
      setError("No se pudo crear el emprendimiento. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar} aria-labelledby="titulo-form-emprendimiento">
      <h4 id="titulo-form-emprendimiento">Nuevo emprendimiento</h4>

      <label htmlFor="emp-nombre">Nombre</label>
      <input
        id="emp-nombre"
        name="nombre"
        type="text"
        value={formulario.nombre}
        onChange={actualizar}
        required
      />

      <label htmlFor="emp-correo">Correo</label>
      <input
        id="emp-correo"
        name="correo"
        type="email"
        value={formulario.correo}
        onChange={actualizar}
        required
      />

      <label htmlFor="emp-descripcion">Descripción</label>
      <textarea
        id="emp-descripcion"
        name="descripcion"
        rows="3"
        value={formulario.descripcion}
        onChange={actualizar}
        required
      />

      <label htmlFor="emp-numero">Número</label>
      <input
        id="emp-numero"
        name="numero"
        type="number"
        min="1"
        value={formulario.numero}
        onChange={actualizar}
        required
      />

      <button className="boton" type="submit" disabled={enviando}>
        {enviando ? "Guardando…" : "Crear emprendimiento"}
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
  );
}
