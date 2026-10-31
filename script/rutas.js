document.addEventListener("DOMContentLoaded", () => {
    const botonesDificultad = document.querySelectorAll(".filtro[data-dificultad]");
    const selectDistancia = document.getElementById("filtro-distancia");
    const tarjetas = document.querySelectorAll(".tarjeta-ruta");
    const avisoSinResultados = document.getElementById("sin-resultados");

    let dificultadActiva = "todas";
    let distanciaActiva = "todas";

    const coincideDistancia = (distancia) => {
        if (distanciaActiva === "corta") return distancia < 5;
        if (distanciaActiva === "media") return distancia >= 5 && distancia <= 10;
        if (distanciaActiva === "larga") return distancia > 10;
        return true;
    };

    const aplicarFiltros = () => {
        let visibles = 0;

        tarjetas.forEach((tarjeta) => {
            const dificultad = tarjeta.dataset.dificultad;
            const distancia = parseFloat(tarjeta.dataset.distancia);
            const coincideDificultad = dificultadActiva === "todas" || dificultad === dificultadActiva;

            if (coincideDificultad && coincideDistancia(distancia)) {
                tarjeta.hidden = false;
                visibles += 1;
            } else {
                tarjeta.hidden = true;
            }
        });

        avisoSinResultados.hidden = visibles > 0;
    };

    botonesDificultad.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesDificultad.forEach((otro) => otro.classList.remove("activo"));
            boton.classList.add("activo");
            dificultadActiva = boton.dataset.dificultad;
            aplicarFiltros();
        });
    });

    selectDistancia.addEventListener("change", (evento) => {
        distanciaActiva = evento.target.value;
        aplicarFiltros();
    });
});
