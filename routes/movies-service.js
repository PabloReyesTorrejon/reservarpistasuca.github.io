'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Movies = function () {
};

Movies.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://user:user@prt-pnet-2023-2024.yvbh14k.mongodb.net/?retryWrites=true&w=majority&appName=prt-pnet-2023-2024",
        {useNewUrlParser: true, useUnifiedTopology: true},
        function (err, database) {
            if (err) {
				console.log(err);
				callback(err);
            }

			db = database.db('prt-pnet-2023-2024').collection('movies');
			console.log("Conexión correcta");

            callback(err, database);
        });
};

Movies.prototype.add = function (movie, callback) {
    return db.insertOne(movie, callback);
};

Movies.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

Movies.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};

Movies.prototype.update = function (_id, updatedMovie, callback) {
    delete updatedMovie._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedMovie}, callback);};

Movies.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

Movies.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Movies();


