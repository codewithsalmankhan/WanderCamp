const mongoose = require('mongoose');

const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '677d9b680d1f8076dad2afe0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'loremipsum adventure camp testing',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dg34y8u9x/image/upload/v1736547463/WanderCamp/xgwzrrrnj8jn3wij79rm.jpg',
                    filename: 'WanderCamp/xgwzrrrnj8jn3wij79rm',
                },
                {
                    url: 'https://res.cloudinary.com/dg34y8u9x/image/upload/v1736547463/WanderCamp/vr1pv4ehd0nk4dtgvkxw.jpg',
                    filename: 'WanderCamp/vr1pv4ehd0nk4dtgvkxw',
                }
            ]

        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })