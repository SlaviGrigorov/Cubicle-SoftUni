const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { initializeDatabase } = require('./config/database');

const { auth } = require('./middlewares/authMiddleware');

const port = 5000;
const app = express();

app.use('/static', express.static('./src/public'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(cookieParser());
app.use(auth);
app.use(router);

initializeDatabase()
    .then(() => {
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    })
    .catch((err) => {
        console.log(`Cannot connect to DB: ${err}`);
    });