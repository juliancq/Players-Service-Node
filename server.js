const express = require('express');

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


app.listen(8081, ()=> console.log("Conectado..."));

app.get('/', (req, res) =>{

    res.status(200).send(jugadores)
})

app.post('/', (req, res) =>{

    const {nombre, apellido, pais, posicion} = req.body;

    if(!nombre) res.status(400).send({message : "'nombre' es requerido"});
    if(!apellido) res.status(400).send({message : "'apellido' es requerido"});
    if(!pais) res.status(400).send({message : "'pais' es requerido"});
    if(!posicion) res.status(400).send({message : "'posicion' es requerido"});

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




