const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const catchAsync = require('../utils/catchAsync');

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

// Rendering the new form - the form will send a post request
router.get('/new', isLoggedIn, async (req, res) => {
    await res.render('campgrounds/new');
})

//Handling the post request sent by form
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Campground is successfully created!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

//Reading id of each object and rendering it on details page
router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find the campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

//Rendering a form for updating an object
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find the campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}));

//using method override to send a put request to save the udpdated object
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Campground is successfully updated!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

//deleting the object
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground is successfully deleted!');
    res.redirect('/campgrounds');
}));

module.exports = router;
