const URL_CLIMA = "https://api.open-meteo.com/v1/forecast";

function construirUrlClima(latitud, longitud) {
    const parametros = new URLSearchParams({
        latitude: latitud,
        longitude: longitud,
        current: "temperature_2m,wind_speed_10m,weather_code",
        timezone: "America/Santiago"
    });

    return `${URL_CLIMA}?${parametros.toString()}`;
}

function describirCielo(codigo) {
    const numero = Number(codigo);

    if (numero === 0) {
        return "Despejado";
    } else if (numero === 1) {
        return "Mayormente despejado";
    } else if (numero === 2) {
        return "Parcialmente nublado";
    } else if (numero === 3) {
        return "Nublado";
    } else if (numero === 45 || numero === 48) {
        return "Niebla";
    } else if (numero >= 51 && numero <= 57) {
        return "Llovizna";
    } else if (numero >= 61 && numero <= 67) {
        return "Lluvia";
    } else if (numero >= 71 && numero <= 77) {
        return "Nieve";
    } else if (numero >= 80 && numero <= 82) {
        return "Chubascos";
    } else if (numero >= 85 && numero <= 86) {
        return "Chubascos de nieve";
    } else if (numero >= 95 && numero <= 99) {
        return "Tormenta eléctrica";
    } else {
        return "Condición desconocida";
    }
}

function mostrarAviso(clima) {
    const temperatura = Number(clima.temperature_2m);
    const viento = Number(clima.wind_speed_10m);
    const codigo = Number(clima.weather_code);

    if (codigo >= 95 && codigo <= 99) {
        return "Tormenta eléctrica: suspende la salida y busca refugio.";
    } else if ((codigo >= 71 && codigo <= 77) || (codigo >= 85 && codigo <= 86)) {
        return "Nieve en la ruta: usa calzado adecuado y revisa el estado del acceso.";
    } else if ((codigo >= 51 && codigo <= 67) || (codigo >= 80 && codigo <= 82)) {
        return "Lluvia o llovizna: lleva impermeable y evita los senderos resbaladizos.";
    } else if (viento > 40) {
        return "Viento fuerte: evita los miradores y los sectores expuestos.";
    } else if (temperatura < 8) {
        return "Hace frío: lleva abrigo, gorro y capas de ropa.";
    } else if (temperatura >= 28) {
        return "Hace calor: hidrátate, usa protector solar y camina temprano.";
    } else {
        return "Buen momento para salir: revisa el pronóstico antes de partir.";
    }
}

async function cargarClima(tarjeta, latitud, longitud) {
    const seccion = tarjeta.querySelector(".clima");
    const estado = tarjeta.querySelector(".clima-estado");
    const temperatura = tarjeta.querySelector(".clima-temperatura");
    const viento = tarjeta.querySelector(".clima-viento");
    const cielo = tarjeta.querySelector(".clima-cielo");
    const aviso = tarjeta.querySelector(".clima-aviso");

    if (!seccion || !estado || !temperatura || !viento || !cielo || !aviso) {
        return;
    }

    seccion.setAttribute("aria-busy", "true");
    estado.textContent = "Cargando clima…";

    try {
        const respuesta = await fetch(construirUrlClima(latitud, longitud));

        if (!respuesta.ok) {
            throw new Error(`La API respondió con el estado ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!datos.current) {
            throw new Error("La API no devolvió datos del clima actual");
        }

        temperatura.textContent = `${datos.current.temperature_2m} °C`;
        viento.textContent = `${datos.current.wind_speed_10m} km/h`;
        cielo.textContent = describirCielo(datos.current.weather_code);
        aviso.textContent = mostrarAviso(datos.current);
        aviso.hidden = false;
        estado.textContent = "Clima actualizado.";
    } catch (error) {
        console.error("No se pudo cargar el clima:", error);
        temperatura.textContent = "--";
        viento.textContent = "--";
        cielo.textContent = "--";
        aviso.textContent = "";
        aviso.hidden = true;
        estado.textContent = "No pudimos cargar el clima. Revisa tu conexión e inténtalo de nuevo.";
    } finally {
        seccion.setAttribute("aria-busy", "false");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tarjeta-ruta[data-lat][data-lon]").forEach((tarjeta) => {
        const latitud = tarjeta.dataset.lat;
        const longitud = tarjeta.dataset.lon;

        cargarClima(tarjeta, latitud, longitud);
    });
});
