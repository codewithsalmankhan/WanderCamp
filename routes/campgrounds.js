const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const Campground = require('../models/campground');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const catchAsync = require('../utils/catchAsync');

// Rendering Index page
router.get('/', catchAsync(campgrounds.index));

// Rendering the new form - the form will send a post request
router.get('/new', isLoggedIn, (campgrounds.renderNewForm));

//Handling the post request sent by form
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

//Reading id of each object and rendering it on details page
router.get('/:id', catchAsync(campgrounds.showCampground));

//Rendering a form for updating an object
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

//using method override to send a put request to save the udpdated object
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//deleting the object
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
