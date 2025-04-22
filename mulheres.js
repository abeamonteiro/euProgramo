const express = require("express") // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // estou trazendo o pacote cors, que permite consumir esta api no frontend
const conectaBanco = require('./bancoDeDados') //ligando ao arquivo bancoDeDados
conectaBanco() //chamando a função que conecta o Banco de Dados

const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json()) //tratando as requisições; a partir disso elas tambem estarão no json
app.use(cors())

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
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome, //request (dentro da requisição); body (quando a pessoa preencher -o corpo-)
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//FUNÇÃO PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
    
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizadaNoBD = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBD)
    } catch (erro) {
        console.log(erro)
    }
}

//FUNÇÃO DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    } catch(erro) {
        console.log(erro)
    }
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