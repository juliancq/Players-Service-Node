const express = require('express');
require('dotenv').config();

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 8081;



const app = express();

app.use(express.json());

const jugadores = [ {
                        nombre : "Lionel",
                        apellido : "Messi",
                        pais : "Argentina",
                        posicion : "Extremo"
                    },
                    {
                        nombre : "Cristiano",
                        apellido : "Ronaldo",
                        pais : "Portugal",
                        posicion : "Centrodelantero"
                    },
                    {
                        nombre : "Neymar",
                        apellido : "Jr",
                        pais : "Brasil",
                        posicion : "Extremo"
                    },
]


app.listen(PORT, ()=> console.log(`🏃 running at http://${HOST}:${PORT} 🏃`));

app.get('/', (req, res) =>{

    res.status(200).send(jugadores)
})

app.post('/', checkParams, (req, res) =>{

    const {nombre, apellido, pais, posicion} = req.body;

    jugadores.push({nombre,apellido,pais,posicion})

    res.status(201).send({
        message : "Jugador creado exitosamente",
        jugador : {
            nombre,
            apellido,
            pais,
            posicion
        }
        })
})

app.put('/:id', checkParams, (req, res) =>{

    const id = req.params.id;

    if(id > jugadores.length) res.status.send({message : "Jugador inexistente"});
    
    const {nombre, apellido, pais, posicion} = req.body;

    jugadores[id] = {nombre, apellido, pais, posicion};

    res.status(201).send({
        message : "Jugador actualizado correctamente",
        jugador : {nombre,apellido,pais,posicion}
    })
})

app.delete('/:id', (req, res) =>{

    const id = req.params.id;

    if(id > jugadores.length) res.status.send({message : "Jugador inexistente"});

    let deleted = jugadores.splice(id, 1)

    res.status(200).send({
        message : `Jugador ${id} correctamente eliminado`,
        jugador : deleted
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



