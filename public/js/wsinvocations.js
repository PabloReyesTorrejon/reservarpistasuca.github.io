function getMovie(movieId) {
    let myUrl = "/reservas/" + movieId;
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

function postMovie() {
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
	    	$("#resPelicula").html(JSON.stringify(data));
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function putMovie(movieId) {
    let myUrl = "/reservas/" + movieId;
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

function deleteMovie(movieId) {
    let myUrl = "/reservas/" + movieId;
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