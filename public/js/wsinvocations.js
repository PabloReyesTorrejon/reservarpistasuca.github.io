function getReserva(reservaId, callback) {
    let myUrl = "/reservas/" + reservaId;
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

function postReserva() {
    $.ajax({
        type: "POST",
        url: "/reservas",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function(data) {
           $("#resPelicula").html(JSON.parse(data).msg); // Para que solo aparezca: Film created!
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getAllReservas() {
    let myUrl = "/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            let htmlGenerado = "<table class='reservas-table'>";   
            htmlGenerado += "<tr class='reservas-table'><th>Pista</th><th>Nombre</th><th>Fecha Reserva</th><th>Hora Inicio</th><th>Hora Fin</th><th>Capacidad</th><th>Reservada</th><th>Acciones</th></tr>";            for (let i = 0; i < data.length; i++) {
                htmlGenerado += `<tr><td>${data[i].pista}</td><td>${data[i].nombre}</td><td>${data[i].fechaReserva}</td><td>${data[i].h_ini}</td><td>${data[i].h_fin}</td><td>${data[i].capacidad}</td><td>${data[i].reservada}</td><td><button class="modificar" onclick="modifyReserva('${data[i]._id}')">Modificar</button> <button class="borrado" onclick="deleteReserva('${data[i]._id}')">Eliminar</button></td></tr>`;
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
function putReserva(reservaId, reserva) {
    let myUrl = "/reservas/" + reservaId;
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
    let myUrl = "/reservas/" + reservaId;
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
        url: "/reservas",
        success: function(data) {
            alert(data.msg); // Para que solo aparezca: Todas las reservas eliminadas!
            getAllReservas(); // Actualiza la lista de reservas
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}