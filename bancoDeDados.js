const mongoose = require('mongoose') //trazendo o pacote mongoose

    async function conectaBanco() { //função assíncrona (async/await)
        try { //tente isto: (try/catch)
            console.log('Conexão com o banco de dados iniciou')

            await mongoose.connect('mongodb+srv://abeatrizbmonteiro:jsD5BuzNwEvJEwUc@cluster0.bmiuv1l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') 
        // o await serve para que o node nao pare de atender as outras pessoas usuarias enquanto trabalha aqui
            console.log('Conexão com o banco de dados feita com sucesso!')
        } catch(erro) { //caso não consiga, pegue o erro
            console.log(erro)
        }
    }

module.exports = conectaBanco