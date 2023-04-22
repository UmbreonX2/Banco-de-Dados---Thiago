const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database{
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(pokemon){
        const dados = await this.obterArquivo()
        const id = pokemon.id <= 2 ? pokemon.id : Date.now()
        const pokemonComid ={
            id,
            ...pokemon
        }

        const dadosFinal=[
            ...dados,
            pokemonComid
        ]

        const resultado = await this.escreverArquivo(dadosFinal)

        return resultado
    }

    async listar(id){
        const dados = await this.obterArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))
        return dadosFiltrados 
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([])
        }
        const dados = await this.obterArquivo()
        const indice = dados.findIndex(item => item.id === id)
        if(indice === -1){
            throw Error('O pokemon não foi encontrado!')
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo(dados)
    }



    async atualizar(id, modificacao){
        const dados = await this.obterArquivo()
        const indice = await dados.findIndex(item=> item.id === id)
        if(indice === -1){
            throw Error('O pokemon não foi encontrado!')
        }

        const atual = dados[indice]

        const objetoAtualiza ={
            ...atual,
            ...modificacao
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualiza
        ])
    }
}

module.exports = new Database()