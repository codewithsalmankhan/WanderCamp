const express = require('express');
const path = require('path')
const mongoose = require('mongoose');

const Campground = require('./models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/wander-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connection to the database is established....");
    })
    .catch(err => {
        console.log("Error encountered in connecting to database, The error is: ", err)
    })

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My backyard',
        description: 'Cheap camping !'
    });
    await camp.save()
    res.send(camp);
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})