function getReserva(reservaId) {
    let myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl, 
        success: function(data) {
	    $("#resPelicula").html(JSON.stringify(data[0]));
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
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
                htmlGenerado += `<li><span>${data[i].nombre} - ${data[i].fechaReserva} - ${data[i].h_ini} - ${data[i].h_fin} - ${data[i].capacidad} - ${data[i].reservada}</span> <button class="borrado" id="boton${i}">Eliminar</button></li>`;
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

function putReserva(reservaId) {
    let myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "PUT",
        url: myUrl,
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "EJEMPLO PUT",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function(data) {
            $("#resPelicula").html(JSON.parse(data).msg); // Para que solo aparezca: Film updated!
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
            $("#resPelicula").html(data.msg); // Para que solo aparezca: Films deleted!
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}