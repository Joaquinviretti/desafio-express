import express from "express"
import fs from "fs"

const app = express()
const PORT = 8080

let itemVisitas = 0;
let randomVisitas = 0;

const server = app.listen(PORT, () => {
    console.log("Escuchando en eñ puerto", server.address().port)
})
server.on("error", error => console.log("Error en el servidor", error))

app.get('/items', (req, res) => {
    ++itemVisitas;
    fs.promises.readFile("productos.txt", "utf-8")
        .then(productos => JSON.parse(productos))
        .then(json =>  res.send({items:json, cantidad:json.length}))
})

app.get('/item-random', (req, res) => {
    ++randomVisitas
    fs.promises.readFile("productos.txt", "utf-8")
    .then(productos => JSON.parse(productos))
    .then(json => {
        const random = Math.round(Math.floor((Math.random() * 3)))
        console.log(random)
        res.send(json[random])
    })
})

app.get('/visitas', (req, res) => {
    res.send({visitas:{items:itemVisitas, item:randomVisitas}})
})

