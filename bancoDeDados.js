const mongoose = require('mongoose') //trazendo o pacote mongoose
require('dotenv').config(MONGO_URL)
    async function conectaBanco() { //função assíncrona (async/await)
        try { //tente isto: (try/catch)
            console.log('Conexão com o banco de dados iniciou')

            await mongoose.connect(process.env.MONGO_URL) 
        // o await serve para que o node nao pare de atender as outras pessoas usuarias enquanto trabalha aqui
            console.log('Conexão com o banco de dados feita com sucesso!')
        } catch(erro) { //caso não consiga, pegue o erro
            console.log(erro)
        }
    }

module.exports = conectaBanco