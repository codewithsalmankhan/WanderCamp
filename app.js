if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const dbUrl = process.env.DB_URL;
//const dbDev = 'mongodb://127.0.0.1:27017/wander-camp';
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const { MongoStore } = require('connect-mongo');

const MongoDBStore = require('connect-mongo')(session);

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the MongoDB database...");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

connectDB();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true })); // Enables parsing the body of form
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize());

const store = new MongoDBStore({
    url: dbUrl,
    secret: 'thisshouldbeawildsecret',
    touchAfter: 24 * 3600
});

store.on("error", function (e) {
    console.log("session store error", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisshouldbeawildsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
// app.use(helmet({
//     contentSecurityPolicy: false
// }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to store flash messages in session
app.use((req, res, next) => {

    res.locals.currentUser = req.user; //user is added by passport once authenticated
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

//custom error handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found!', 404));
})

//error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})