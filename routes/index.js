var express = require('express');
var router = express.Router();

var Person = require('../models/person');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/userarea',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/userarea',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/userarea', isAuthenticated, function(req, res){
		res.render('userarea', { user: req.user });
	});

	router.route('/userarea/adddata')
		.get(isAuthenticated, function(req, res){
			res.render('adddata', { user: req.user });
		})
		.post(isAuthenticated, function(req, res){
			
	    var person = new Person();
	    person.name = req.body.name;
	    person.p_id = req.user.username;
	    person.info1 = req.body.info1;
	    person.info2 = req.body.info2;

	    person.save(function (error) {
	      if (error) {
	        res.render('adddata', { user: req.user, message:'Person not added.' });
	      }

	      res.render('adddata', { user: req.user, message:'Person added.' });
	    });		
		});


	// can only get data for people this user added
	router.route('/userarea/allpeople')
		.get(isAuthenticated, function(req, res){			
			Person
				.find()
				.where('p_id')
				.equals(req.user.username)
				.exec(function (error, people) {
		      if (error) {
		        res.send(error);
		      }

    		res.render('allpeople', { people: people });
  		});
		});


	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}