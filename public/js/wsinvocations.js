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
            let htmlGenerado = "<ul>";   
            for (let i = 0; i < data.length; i++) {
                htmlGenerado += `<li><span>${data[i].nombre} - ${data[i].fechaReserva} - ${data[i].h_ini} - ${data[i].h_fin} - ${data[i].capacidad} - ${data[i].reservada}</span> <button class="modificar" onclick="modifyReserva('${data[i]._id}')">Modificar</button> <button class="borrado" onclick="deleteReserva('${data[i]._id}')">Eliminar</button></li>`;
            }
            htmlGenerado += "</ul>";
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
            let htmlGenerado = `<form id="modifyForm">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${reserva.nombre}"><br>
                <input type="date" id="fechaReserva name="fechaReserva" value="${reserva.fechaReserva}"><br>
                <input type="time" id="h_ini" name="h_ini" value="${reserva.h_ini}"><br>
                <input type="time" id="h_fin" name="h_fin" value="${reserva.h_fin}"><br>
                <input type="submit" value="Modificar reserva">
            </form>`;
            $("#listado").html(htmlGenerado);

            $("#modifyForm").submit(function(event) {
                event.preventDefault();
                let reserva = {
                    nombre: $("#nombre").val(),
                    fechaReserva: $("#fechaReserva").val(),
                };
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