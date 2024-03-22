document.addEventListener('DOMContentLoaded', function() {
    // Cargamos el select de deportes con los datos de la API
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

    // Obligamos al usuario a introducir un nombre que solo contenga letras
    var inputNombre = document.querySelector('#nombre');
    var mensajeErrornombre = document.createElement('p');
    mensajeErrornombre.style.color = 'red';
    inputNombre.parentNode.insertBefore(mensajeErrornombre, inputNombre.nextSibling);
    inputNombre.addEventListener('input', function() {
        // Verifica si el valor del campo de entrada contiene algún carácter que no sea una letra
        if (!/^[a-zA-z\s]*$/.test(inputNombre.value)) {
            // Si es así, muestra un mensaje de error
            mensajeErrornombre.textContent = 'El nombre solo puede contener letras.';
        } else {
            // Si no, borra el mensaje de error
            mensajeErrornombre.textContent = '';
        }
    });
    
    // Obligamos al usuario a introducir un correo de la UCA
    var inputCorreo = document.querySelector('#email');
    var mensajeCorreo = document.createElement('p');
    mensajeCorreo.style.color = 'red';
    inputCorreo.parentNode.insertBefore(mensajeCorreo, inputCorreo.nextSibling);
    inputCorreo.addEventListener('input', function() {
        if (!/.*@alum.uca.es$/.test(inputCorreo.value)) {
            // Si es así, muestra un mensaje de error
            mensajeCorreo.textContent = 'Sólo para usuarios UCA';
        } else {
            // Si no, borra el mensaje de error
            mensajeCorreo.textContent = '';
        }
    });

     // Obligamos al usuario a seleccionar una opción en el menú desplegable
    var inputDeporte = document.querySelector('#deporte');
    var mensajeDeporte = document.createElement('p');
    mensajeDeporte.style.color = 'red';

    var inputFecha = document.querySelector('#fechaReserva');
    var mensajeFecha = document.createElement('p');
    mensajeFecha.style.color = 'red';

    var inputNumPersonas = document.querySelector('#numPersonas');
    var mensajePersonas = document.createElement('p');
    mensajePersonas.style.color = 'red';

    var inputHora = document.querySelector('#horaReserva');
    var mensajeHora = document.createElement('p');
    mensajeHora.style.color = 'red';

    var inputNumTelefono = document.querySelector('#telefono');
    var mensajeTelefono = document.createElement('p');
    mensajeTelefono.style.color = 'red';
    

    // Encuentra el formulario y agrega un controlador de eventos 'submit'
    var formulario = document.querySelector('#consultar-salas');
    formulario.addEventListener('submit', function(event) {
        // Verifica si se ha seleccionado una opción en el menú desplegable
        if (inputDeporte.selectedIndex === 0) {
            // Si no se ha seleccionado ninguna opción, muestra un mensaje de error y evita que se envíe el formulario
            event.preventDefault();
            mensajeDeporte.textContent = 'Por favor, selecciona una opción en el menú desplegable.';
            inputDeporte.parentNode.insertBefore(mensajeDeporte, inputDeporte.nextSibling);
        } else {
            // Si se ha seleccionado una opción, borra el mensaje de error
            mensajeDeporte.textContent = '';
        }
    });

    formulario.addEventListener('submit', function(event) {
        // Obtiene la fecha actual y la fecha introducida por el usuario
        var fechaActual = new Date();
        var fechaIntroducida = new Date(inputFecha.value);
        // Verifica si la fecha introducida es posterior a la fecha actual
        if (fechaIntroducida <= fechaActual) {
            event.preventDefault();
            mensajeFecha.textContent = 'Por favor, introduce una fecha posterior a la actual.';
            inputFecha.parentNode.insertBefore(mensajeFecha, inputFecha.nextSibling);
        } else {
            mensajeFecha.textContent = '';
        }
    });

    // Agrega un controlador de eventos 'change' al menú desplegable y al campo de entrada del número de personas
    inputDeporte.addEventListener('change', verificar);
    inputNumPersonas.addEventListener('change', verificar);
    // Verifica si se ha seleccionado "tenis" y si el número de personas es mayor que 2, idem con futbol
    function verificar() {
        // Verifica si se ha seleccionado "tenis" y si el número de personas es mayor que 2
        if (inputDeporte.value === 'Tenis' && Number(inputNumPersonas.value) > 4) {
            // Si ambas condiciones se cumplen, muestra un mensaje de error
            mensajePersonas.textContent = 'El tenis solo permite un máximo de 4 personas.';
            inputDeporte.parentNode.insertBefore(mensajePersonas, inputDeporte.nextSibling);
        } else if(inputDeporte.value === 'Fútbol' && Number(inputNumPersonas.value) > 11){
            mensajePersonas.textContent = 'El fútbol solo permite un máximo de 11 personas.';
            inputDeporte.parentNode.insertBefore(mensajePersonas, inputDeporte.nextSibling);
        } else {
            mensajePersonas.textContent = '';
        }
    }

    // Verifica que la hora introducida se encuentre en un rango de 08:00 a 21:00
    inputHora.addEventListener('change', function() {
        // Obtiene la hora introducida por el usuario
        var horaIntroducida = new Date('1970-01-01T' + inputHora.value + ':00');

        // Define las horas mínima y máxima permitidas
        var horaMinima = new Date('1970-01-01T08:00:00');
        var horaMaxima = new Date('1970-01-01T22:00:00');

        // Verifica si la hora introducida está fuera del rango permitido
        if (horaIntroducida < horaMinima || horaIntroducida > horaMaxima) {
            // Si es así, muestra un mensaje de error
            mensajeFecha.textContent = 'Por favor, introduce una hora entre las 8:00 y las 22:00.';
            inputHora.parentNode.insertBefore(mensajeFecha, inputHora.nextSibling);
        } else {
            // Si no, borra el mensaje de error
            mensajeFecha.textContent = '';
        }
    });

    // Verifica que el número de teléfono introducido tenga nueve dígitos
    inputNumTelefono.addEventListener('input', function() {
        // Verifica si el número de teléfono tiene nueve dígitos
        if (inputNumTelefono.value.length !== 9) {
            // Si no es así, muestra un mensaje de error
            mensajeTelefono.textContent = 'El número de teléfono debe tener nueve dígitos.';
            inputNumTelefono.parentNode.insertBefore(mensajeTelefono, inputNumTelefono.nextSibling);
        } else {
            // Si no, borra el mensaje de error
            mensajeTelefono.textContent = '';
        }
    });

});

var pistas = [
    {fecha: '2024-09-01', numPersonas: 4, nombre: 'Pista 1', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Fútbol'},
    {fecha: '2024-09-01', numPersonas: 4, nombre: 'Pista 1', hora_ini: '09:00', hora_fin: '10:00', tipo: 'Fútbol'},
    {fecha: '2024-09-01', numPersonas: 2, nombre: 'Pista 2', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Fútbol'},
    {fecha: '2024-09-01', numPersonas: 2, nombre: 'Pista 2', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Tenis'},
    {fecha: '2024-09-01', numPersonas: 2, nombre: 'Pista 2', hora_ini: '09:00', hora_fin: '10:00', tipo: 'Tenis'},
    {fecha: '2024-09-01', numPersonas: 4, nombre: 'Pista 3', hora_ini: '08:00', hora_fin: '09:00', tipo: 'Tenis'},
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
    var horaReserva = String(document.querySelector('#horaReserva').value);

    // Filtra las pistas que coinciden con la fecha y el número de personas:
    var pistasFiltradas = pistas.filter(function(pista) {
        //console.log(pista.fecha, pista.numPersonas, pista.tipo, pista.hora_ini);
        if(horaReserva.length === 0){
        
            return pista.fecha === fechaEspecifica && pista.numPersonas === numPersonasEspecifico && pista.tipo === deporteEspecifico;
        }
        else{
            return pista.fecha === fechaEspecifica && pista.numPersonas === numPersonasEspecifico && pista.tipo === deporteEspecifico && pista.hora_ini === horaReserva;
        }

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