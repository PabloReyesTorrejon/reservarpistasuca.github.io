'use strict';

const express = require('express');
const router = express.Router();
const moviesService = require('./reservas-service');

router.get('/', function (req, res) {
    moviesService.getAll((err, movies) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (movies.length == 0){
            	res.status(500).send({
                    msg: "movies null"
                });
            } else {
                res.status(200).send(movies);
            }
        }
    );
});

router.post('/', function (req, res) {
    let movie = req.body;
    if (Object.entries(movie).length === 0){
        res.status(400).send({
            msg: 'Empty movie'
        });
    }
	else{
		moviesService.add(movie, (err, movie) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } 
			else
			{
                res.status(201).send({
                    msg: 'Film created!'
                });
            }
        });
	}
});


router.delete('/', function (req, res) {
    moviesService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Films deleted!'
            });
        }
    });
});


router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    moviesService.get(_id, (err, movie) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (movie.length == 0){
            	res.status(500).send({
                    msg: "movie is null"
                });
            } else {
                res.status(200).send(movie);
            }
        }
    );
});


router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedMovie = req.body;
    moviesService.update(_id, updatedMovie, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
	} else if(numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "Not updated"
            });
        } else {
            res.status(200).send({
                msg: 'Film updated!'
            });
        }
    });
});

router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    moviesService.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Film deleted!'
            });
        }
    });
});

module.exports = router;
