const express = require('express');
const hbs = require('express-handlebars');

const port = 5000;
const app = express();

app.use('/static', express.static('public'));

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('vies', './views');

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));