// Cargamos el select de deportes con los datos de la API
document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var deporte = urlParams.get('deporte');
    if (deporte) {
        var select = document.querySelector('#deporte');
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value === deporte) {
                select.selectedIndex = i;
                break;
            }
        }
    }
});

var pistas = [
    {fecha: '2022-01-01', numPersonas: 4, nombre: 'Pista 1', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Futbol'},
    {fecha: '2022-01-01', numPersonas: 2, nombre: 'Pista 2', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Futbol'},
    {fecha: '2022-01-01', numPersonas: 2, nombre: 'Pista 2', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Tenis'},
    // Más pistas aquí...
];

// Encuentra el formulario "Consultar salas" en tu página:
var formulario = document.querySelector('#consultar-salas');

// Agrega un controlador de eventos de envío al formulario:
formulario.addEventListener('submit', function(event) {
    // Previene la recarga de la página
    event.preventDefault();

    // Aquí puedes obtener los valores de los campos de tu formulario
    var fechaEspecifica = document.querySelector('#fechaReserva').value;
    var numPersonasEspecifico = Number(document.querySelector('#numPersonas').value);
    var deporteEspecifico = document.querySelector('#deporte').value;
    // Filtra las pistas que coinciden con la fecha y el número de personas:
    var pistasFiltradas = pistas.filter(function(pista) {
        return pista.fecha === fechaEspecifica && pista.numPersonas === numPersonasEspecifico && pista.tipo === deporteEspecifico;
    });

    // Limpia el div por si ya había una tabla o un mensaje
    var divTabla = document.querySelector('#tabla');
    divTabla.innerHTML = '';

    if (pistasFiltradas.length === 0) {
        // Si no hay pistas que coincidan, muestra un mensaje
        var mensaje = document.createElement('p');
        mensaje.textContent = 'No hay pistas disponibles que coincidan con tu búsqueda.';
        mensaje.style.color = 'red';
        divTabla.appendChild(mensaje);
    } else {
        // Si hay pistas que coincidan, genera la tabla
        var tabla = document.createElement('table');
        tabla.style.width = '100%'; // Asegura que la tabla ocupe todo el ancho disponible

        // Agrega una fila de encabezado
        var filaEncabezado = document.createElement('tr');

        var celdaEncabezadoNombre = document.createElement('th');
        celdaEncabezadoNombre.textContent = 'Nombre de la Pista';
        celdaEncabezadoNombre.style.textAlign = 'center'; // Centra el texto en la celda
        filaEncabezado.appendChild(celdaEncabezadoNombre);
        
        var celdaEncabezadoFecha = document.createElement('th');
        celdaEncabezadoFecha.textContent = 'Fecha';
        celdaEncabezadoFecha.style.textAlign = 'center'; // Centra el texto en la celda
        filaEncabezado.appendChild(celdaEncabezadoFecha);

        var celdaEncabezadoHoraIni = document.createElement('th');
        celdaEncabezadoHoraIni.textContent = 'Hora de Inicio';
        celdaEncabezadoHoraIni.style.textAlign = 'center'; // Centra el texto en la celda
        filaEncabezado.appendChild(celdaEncabezadoHoraIni);

        var celdaEncabezadoHoraFin = document.createElement('th');
        celdaEncabezadoHoraFin.textContent = 'Hora de Fin';
        celdaEncabezadoHoraFin.style.textAlign = 'center'; // Centra el texto en la celda
        filaEncabezado.appendChild(celdaEncabezadoHoraFin);

        var celdaEncabezadoNumPersonas = document.createElement('th');
        celdaEncabezadoNumPersonas.textContent = 'Número de Personas';
        celdaEncabezadoNumPersonas.style.textAlign = 'center'; // Centra el texto en la celda
        filaEncabezado.appendChild(celdaEncabezadoNumPersonas);


        // Agrega una celda de encabezado vacía para la columna del botón
        var celdaEncabezadoBoton = document.createElement('th');
        filaEncabezado.appendChild(celdaEncabezadoBoton);

        tabla.appendChild(filaEncabezado);

        pistasFiltradas.forEach(function(pista) {
            var fila = document.createElement('tr');

            var celdaNombre = document.createElement('td');
            celdaNombre.textContent = pista.nombre;
            celdaNombre.style.textAlign = 'center'; // Centra el texto en la celda
            fila.appendChild(celdaNombre);

            var celdaFecha = document.createElement('td');
            celdaFecha.textContent = pista.fecha;
            celdaFecha.style.textAlign = 'center'; // Centra el texto en la celda
            fila.appendChild(celdaFecha);

            var celdaHoraIni = document.createElement('td');
            celdaHoraIni.textContent = pista.hora_ini;
            celdaHoraIni.style.textAlign = 'center'; // Centra el texto en la celda
            fila.appendChild(celdaHoraIni);

            var celdaHoraFin = document.createElement('td');
            celdaHoraFin.textContent = pista.hora_fin;
            celdaHoraFin.style.textAlign = 'center'; // Centra el texto en la celda
            fila.appendChild(celdaHoraFin);

            var celdaNumPersonas = document.createElement('td');
            celdaNumPersonas.textContent = pista.numPersonas;
            celdaNumPersonas.style.textAlign = 'center'; // Centra el texto en la celda
            fila.appendChild(celdaNumPersonas);

            var celdaBoton = document.createElement('td');
            celdaBoton.style.display = 'flex';
            celdaBoton.style.justifyContent = 'center';
            var boton = document.createElement('button');
            boton.textContent = 'Reservar';
            celdaBoton.appendChild(boton);
            fila.appendChild(celdaBoton);

            tabla.appendChild(fila);
        });

        // Agrega la tabla a tu página:
        divTabla.appendChild(tabla);
    }
});