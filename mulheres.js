const express = require("express")
const router = express.Router()


const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({       // uma forma de enviar pela internet, várias informaçoes organizadas, um objeto; no send, apenas uma info
        nome: 'Ana Beatriz Monteiro',
        imagem: 'https://lh3.googleusercontent.com/a/ACg8ocKgWCiGVd36YDmTARVvXvdbokkUZ9xbaD3zOFPr2fz5gVsSo0qHOg=s288-c-no',
        minibio: 'Assistente Social e Desenvolvedora de Software'
    })
}

function mostraPorta() {
    console.log ("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulheres', mostraMulher))
app.listen(porta, mostraPorta)