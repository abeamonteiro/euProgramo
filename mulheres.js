const express = require("express") // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid')

const conectaBanco = require('./bancoDeDados') //ligando ao arquivo bancoDeDados
conectaBanco() //chamando a função que conecta o Banco de Dados

const Mulher = require('./mulherModel')
const app = express() // aqui estou iniciando o app
app.use(express.json()) //tratando as requisições; a partir disso elas tambem estarão no json
const porta = 3333 // aqui estou criando a porta

//FUNÇÃO GET
 async function mostraMulher(request, response) {
    try {
        const mulheresVindasDoBD = await Mulher.find()

        response.json(mulheresVindasDoBD)
    } catch(erro) {
        console.log(erro)
    }
 }

//FUNÇÃO POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome, //request (dentro da requisição); body (quando a pessoa preencher -o corpo-)
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//FUNÇÃO PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher 
        }

    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }

    response.json(mulheres)
}

//FUNÇÃO DELETE
function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
        if(mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicam)
}

//ROTAS
app.use(router.get('/mulheres', mostraMulher)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configurei rota POST /mulheres 
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei rota PATH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota DELETE /mulheres/:id

//FUNÇÃO PORTA
function mostraPorta() {
    console.log ("Servidor criado e rodando na porta", porta)
}
app.listen(porta, mostraPorta) // servidor ouvindo a porta