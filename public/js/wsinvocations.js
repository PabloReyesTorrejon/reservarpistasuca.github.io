$(document).ready(function() {
    $("#creaReserva").submit(function(event) {
        event.preventDefault();
        var reserva = {
            deporte: $("#deporte").val(),
            pista: $("#pista").val(),
            nombre: $("#nombre").val(),
            fechaReserva: $("#fechaReserva").val(),
            h_ini: $("#h_ini").val(),
            h_fin: $("#h_fin").val(),
            capacidad: $("#capacidad").val(),
            reservada: $("#reservada").val()
        };

        postReserva(reserva);
    });
});

function postReserva(reserva){
    let myUrl = "http://localhost:8080/reservas";
    $.ajax({
        type: "POST",
        url: myUrl,
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify(reserva),
        success: function(data) {
            $("#resReserva").html(JSON.parse(data).msg);
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getAllReservas() {
    let myUrl = "http://localhost:8080/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            let htmlGenerado = "<table class='reservas-table'>";   
            htmlGenerado += "<tr class='reservas-table'><th>Deporte</th><th>Pista</th><th>Nombre</th><th>Fecha Reserva</th><th>Hora Inicio</th><th>Hora Fin</th><th>Capacidad</th><th>Reservada</th><th>Acciones</th></tr>";            
            for (let i = 0; i < data.length; i++) {
                htmlGenerado += `<tr><td>${data[i].deporte}</td><td>${data[i].pista}</td><td>${data[i].nombre}</td><td>${data[i].fechaReserva}</td><td>${data[i].h_ini}</td><td>${data[i].h_fin}</td><td>${data[i].capacidad}</td><td>${data[i].reservada}</td><td><button class="modificar" onclick="modifyReserva('${data[i]._id}')">Modificar</button> <button class="borrado" onclick="deleteReserva('${data[i]._id}')">Eliminar</button></td></tr>`;
            }
            htmlGenerado += "</table>";
            htmlGenerado += "<button class='borrado' onclick='deleteAllReservas()'>Eliminar todas las reservas</button>";
            $("#listado").html(htmlGenerado);
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

$(document).ready(function() {
    getAllReservas();
});

function modifyReserva(reservaId) {
    getReserva(reservaId, function(err, reserva) {
        if (err) {
            alert("ERROR: " + err.statusText);
        } else {
            let pista = reserva.pista || '';
            let htmlGenerado = `<form id="modifyForm">
                <label for="pista">Nombre Pista:</label>
                <input type="text" id="pista" name="pista" value="${pista}"><br>
                <label for="fechaReserva">Nueva Fecha:</label>
                <input type="date" id="fechaReserva" name="fechaReserva" value="${reserva.fechaReserva}"><br>
                <label for="h_ini">Nueva hora de inicio:</label>
                <input type="time" id="h_ini" name="h_ini" value="${reserva.h_ini}"><br>
                <label for="h_fin">Nueva hora de fin:</label>
                <input type="time" id="h_fin" name="h_fin" value="${reserva.h_fin}"><br>
                <input type="submit" value="Modificar reserva">
            </form>`;
            $("#listado").html(htmlGenerado);

            $("#modifyForm").submit(function(event) {
                event.preventDefault();
                let reserva = {
                    pista: $("#pista").val(),
                    fechaReserva: $("#fechaReserva").val(),
                    h_ini: $("#h_ini").val(),
                    h_fin: $("#h_fin").val()
                };
                if (!reserva.pista) {
                    delete reserva.pista;
                }
                if (!reserva.fechaReserva) {
                    delete reserva.fechaReserva;
                }
                if (!reserva.h_ini) {
                    delete reserva.h_ini;
                }
                if (!reserva.h_fin) {
                    delete reserva.h_fin;
                }
                putReserva(reservaId, reserva);
            });
        }
    });
}

function getReserva(reservaId, callback) {
    let myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        url: myUrl,
        dataType: "json",
        success: function(data) {
            callback(null, data);
        },
        error: function(res) {
            callback(res);
        }
    });
}

function getUserReservas(UserName){
    let myUrl = "http://localhost:8080/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            let htmlGenerado = "<table class='reservas-table'>";   
            htmlGenerado += "<tr class='reservas-table'><th>Deporte</th><th>Pista</th><th>Nombre</th><th>Fecha Reserva</th><th>Hora Inicio</th><th>Hora Fin</th><th>Capacidad</th><th>Reservada</th><th>Acciones</th></tr>";            
            for (let i = 0; i < data.length; i++) {
                if(data[i].nombre == UserName){
                    htmlGenerado += `<tr><td>${data[i].deporte}</td><td>${data[i].pista}</td><td>${data[i].nombre}</td><td>${data[i].fechaReserva}</td><td>${data[i].h_ini}</td><td>${data[i].h_fin}</td><td>${data[i].capacidad}</td><td>${data[i].reservada}</td><td><button class="borrado" onclick="deleteReserva('${data[i]._id}')">Eliminar</button></td></tr>`;
                }
            }
            htmlGenerado += "</table>";
            /* htmlGenerado += "<button class='borrado' onclick='deleteAllReservas()'>Eliminar todas las reservas</button>"; */
            $("#listUser").html(htmlGenerado);
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function putReserva(reservaId, reserva) {
    let myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "PUT",
        url: myUrl,
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify(reserva),
        success: function(data) {
            $("#resPelicula").html(JSON.parse(data).msg); // Para que solo aparezca: Reserva actualizada!
            getAllReservas(); // Actualiza la lista de reservas
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function deleteReserva(reservaId) {
    let myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "DELETE",
        url: myUrl,
        success: function(data) {
            alert(data.msg); // Para que solo aparezca: Reserva eliminada!
            getAllReservas(); // Actualiza la lista de reservas
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function deleteAllReservas() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/reservas",
        success: function(data) {
            alert(data.msg); // Para que solo aparezca: Todas las reservas eliminadas!
            getAllReservas(); // Actualiza la lista de reservas
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

/*Formulario de creacion de reservas*/
document.addEventListener('DOMContentLoaded', function() {

    var inputDeporte = document.querySelector('#deporte');
    var mensajeDeporte = document.createElement('p');
    mensajeDeporte.style.color = 'red';

    var inputFecha = document.querySelector('#fechaReserva');
    var mensajeFecha = document.createElement('p');
    mensajeFecha.style.color = 'red';

    var inputNumPersonas = document.querySelector('#capacidad');
    var mensajePersonas = document.createElement('p');
    mensajePersonas.style.color = 'red';

    var inputHoraInicio = document.querySelector('#h_ini');
    var mensajeHoraInicio = document.createElement('p');
    mensajeHoraInicio.style.color = 'red';

    var inputHoraFin = document.querySelector('#h_fin');
    var mensajeHoraFin = document.createElement('p');
    mensajeHoraFin.style.color = 'red';

    var formulario = document.querySelector('#creaReserva');
    formulario.addEventListener('change', function(event) {
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
    inputHoraInicio.addEventListener('change', function() {
        // Obtiene la hora introducida por el usuario
        var horaIntroducida = new Date('1970-01-01T' + inputHoraInicio.value + ':00');

        // Define las horas mínima y máxima permitidas
        var horaMinima = new Date('1970-01-01T08:00:00');
        var horaMaxima = new Date('1970-01-01T22:00:00');

        // Verifica si la hora introducida está fuera del rango permitido
        if (horaIntroducida < horaMinima || horaIntroducida > horaMaxima) {
            // Si es así, muestra un mensaje de error
            mensajeHoraInicio.textContent = 'Por favor, introduce una hora entre las 8:00 y las 22:00.';
            inputHoraInicio.parentNode.insertBefore(mensajeFecha, inputHoraInicio.nextSibling);
        } else {
            // Si no, borra el mensaje de error
            mensajeHoraInicio.textContent = '';
        }
    });
    inputHoraFin.addEventListener('change', function() {
        // Obtiene la hora introducida por el usuario
        var horaIntroducida = new Date('1970-01-01T' + inputHoraFin.value + ':00');

        // Define las horas mínima y máxima permitidas
        var horaMinima = new Date('1970-01-01T08:00:00');
        var horaMaxima = new Date('1970-01-01T22:00:00');

        // Verifica si la hora introducida está fuera del rango permitido
        if (horaIntroducida < horaMinima || horaIntroducida > horaMaxima) {
            // Si es así, muestra un mensaje de error
            mensajeHoraFin.textContent = 'Por favor, introduce una hora entre las 8:00 y las 22:00.';
            inputHoraFin.parentNode.insertBefore(mensajeFecha, inputHoraFin.nextSibling);
        } else {
            // Si no, borra el mensaje de error
            mensajeHoraFin.textContent = '';
        }
    });
    formulario.addEventListener('submit', function(event) {
        // Verifica si hay errores
        var hayErrores = mensajeDeporte.textContent || mensajeFecha.textContent || mensajePersonas.textContent || mensajeHoraInicio.textContent || mensajeHoraFin.textContent;
    
        if (hayErrores) {
            // Si hay errores, evita que se envíe el formulario
            event.preventDefault();
            alert('Por favor, corrige los errores antes de enviar el formulario.');
        }
    });
});