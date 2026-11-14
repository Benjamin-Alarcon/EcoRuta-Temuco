const formulario = document.getElementById("form-contacto");
const aviso = document.getElementById("aviso-contacto");
const campos = [...formulario.querySelectorAll("input, textarea")];

formulario.addEventListener("submit", (evento) => evento.preventDefault());

campos.forEach((campo) => {
    campo.addEventListener("input", () => {
        campo.setCustomValidity("");
        aviso.textContent = "";
    });
});

document.getElementById("revisar-contacto").addEventListener("click", () => {
    const minimos = { nombre: 2, asunto: 3, contenido: 10 };

    campos.forEach((campo) => {
        campo.setCustomValidity("");
        const largoMinimo = minimos[campo.name];
        if (largoMinimo && campo.value.trim().length < largoMinimo) {
            campo.setCustomValidity(`Escribe al menos ${largoMinimo} caracteres, sin contar espacios al inicio o al final.`);
        }
    });

    if (!formulario.reportValidity()) {
        aviso.textContent = "Revisa los campos indicados para completar tu mensaje.";
        return;
    }

    aviso.textContent = "Los campos están completos. El envío aún no está disponible: tu mensaje no se guardó ni se envió.";
});
