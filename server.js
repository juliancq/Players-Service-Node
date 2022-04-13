const express = require('express');
const {v4 : uuid} = require('uuid');
require('dotenv').config();

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());

let jugadores = []


app.listen(PORT, ()=> console.log(`🏃 running at http://${HOST}:${PORT} 🏃`));

app.get('/', (req, res) =>{

    res.status(200).send(jugadores)
})

app.post('/', checkParams, (req, res) =>{

    const {nombre, apellido, pais, posicion} = req.body;

    let id = uuid();

    jugadores.push({id, nombre,apellido,pais,posicion})

    res.status(201).send({
        message : "Jugador creado exitosamente",
        created : {
            id,
            nombre,
            apellido,
            pais,
            posicion
        }
        })
})

app.put('/:id', checkParams, (req, res) =>{

    const id = req.params.id;

    let exist = jugadores.find(e => e.id == id);

    if(!exist) res.status(404).send({message : "Jugador inexistente"});
    
    const {nombre, apellido, pais, posicion} = req.body;

    jugadores = [
        ...jugadores.filter(e => e.id != id),
        {id, nombre, apellido, pais, posicion}
    ]

    res.status(201).send({
        message : "Jugador actualizado correctamente",
        updated : {nombre,apellido,pais,posicion}
    })
})

app.delete('/:id', (req, res) =>{

    const id = req.params.id;

    let jugador = jugadores.find(e => e.id == id);

    if(!jugador) res.status(404).send({message : "Jugador inexistente"});

    jugadores = jugadores.filter(e => e.id != id);

    res.status(200).send({
        message : `Jugador ${id} correctamente eliminado`,
        deleted : jugador
    })
})


/* Chequea que existan nombre, apellido, pais, posicion */
function checkParams(req, res, next){

    if(!req.body.nombre) res.status(400).send({message : "'nombre' es requerido"});
    if(!req.body.apellido) res.status(400).send({message : "'apellido' es requerido"});
    if(!req.body.pais) res.status(400).send({message : "'pais' es requerido"});
    if(!req.body.posicion) res.status(400).send({message : "'posicion' es requerido"});

    next();
}



