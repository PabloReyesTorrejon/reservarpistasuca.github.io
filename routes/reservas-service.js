'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Reservas = function () {
};

Reservas.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://user:user@prt-pnet-2023-2024.yvbh14k.mongodb.net/?retryWrites=true&w=majority&appName=prt-pnet-2023-2024",
        {useNewUrlParser: true, useUnifiedTopology: true},
        function (err, database) {
            if (err) {
				console.log(err);
				callback(err);
            }

			db = database.db('prt-pnet-2023-2024').collection('Reservas');
			console.log("Conexión correcta");

            callback(err, database);
        });
};

Reservas.prototype.add = function (Reserva, callback) {
    return db.insertOne(Reserva, callback);
};

Reservas.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

Reservas.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};

Reservas.prototype.update = function (_id, updatedReserva, callback) {
    delete updatedReserva._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedReserva}, callback);};

Reservas.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

Reservas.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Reservas();


