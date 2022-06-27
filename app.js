const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { success, getUniqueId } = require("./helper.js");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan("dev"))
    .use(bodyParser.json());

app.get('/', (req, res) => res.send('OK je comprend mieux !'));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = `Un pokemon à bien était trouvé.`;
    res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res) => {
    const message = `Des pokemons ont bien était trouvé.`;
    res.json(success(message, pokemons));
});

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
    pokemons.push(pokemonCreated);
    const message = `le pokemon ${pokemonCreated.name} a bien été crée.`;
    res.json(success(message, pokemonCreated));
});

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    });
    const message = `le pokemon ${pokemonUpdated.name} a bien été modifier`;
    res.json(success(message, pokemonUpdated));
});

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimer.`;
    res.json(success(message, pokemonDeleted));
});

app.listen(port, () => console.log(`Notre Application Node est démarrée sur : http://localhost:${port}`));