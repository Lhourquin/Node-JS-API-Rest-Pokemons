const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan("dev"))
    .use(bodyParser.json());

sequelize.initDb();

// Ici, nous placerons nos futur point de terminaisons
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonbyPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// On ajoute la gestion des erreurs 404
app.use(({res})=> {
    const message = 'impossible de toruver la ressource demandée ! Vous pouvez essayer une autre URL.';
    res.status(404).json({message});
});

app.listen(port, () => console.log(`Notre Application Node est démarrée sur : http://localhost:${port}`));