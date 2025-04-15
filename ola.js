// Identificadores e palavras reservadas
const express = require("express")
const router = express.Router() // função rota que vem do express

const app = express()
const porta = 3333 

function mostraOla(request, response) {
    response.send("Olá, mundo!")
}

function mostraPorta() {
    console.log ("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/ola', mostraOla)) // eu quero que o meu servidor use a rota get, chamando o endereço ola
app.listen(porta, mostraPorta)