const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const app = require('express')();
const moment = require('moment');

// Live Reload configuration
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Fontend route
const FrontRouter = require('./routes/front');

// Set ejs template engine
app.set('view engine', 'ejs');

app.use(connectLiveReload());

app.use(bodyParse.urlencoded({ extended: false }));
app.locals.moment = moment;

const db1 = require('./config/keys').mongoProdURI;
mongoose
    .connect(db1, { useNewUrlParser: true })
    .then(() => console.log(`MongoDB (Ciência da Computação) conectado`))
    .catch(error => console.log(error));

const mongoose2 = require('mongoose');
const db2 = require('./config/keys').mongoProdURI2;
mongoose2
    .connect(db2, { useNewUrlParser: true })
    .then(() => console.log(`MongoDB (Super) conectado`))
    .catch(error => console.log(error));

app.use(FrontRouter);

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
