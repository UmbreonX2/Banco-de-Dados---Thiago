const {deepEqual, ok} = require('assert')
const exp = require('constants')
const database = require('./database')

const DEFAULT_ITEM_CADASTRO = {
    nome: 'Bulbasaur',
    tipo: 'Grama',
    Habilidade1: 'Chicote de videira',
    Habilidade2: 'Folha navalha',
    id: 1
    
    // nome: 'Squirtle',
    // tipo: 'Água',
    // Habilidade1: 'Hidrobomba',
    // Habilidade2: 'Pulso de água',
    // id: 3
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Charmander',
    tipo: 'Fogo',
    Habilidade1: 'Brasa',
    Habilidade2: 'Lança Chamas',
    id: 2
}

describe('manipulação de personagem', ()=>{

    before(async()=>{
        await database.remover()
        await database.cadastrar(DEFAULT_ITEM_CADASTRO)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)

    })

    it('deve pesquisar um pokemon no arquivo', async()=>{
        const expect = DEFAULT_ITEM_CADASTRO
        const [resultado] = await database.listar(expect.id)

        deepEqual(resultado, expect)
        console.log(resultado)
    })

    it('Deve cadastrar um pokemon no arquivo', async() =>{
        const expect = DEFAULT_ITEM_CADASTRO
        await database.cadastrar(DEFAULT_ITEM_CADASTRO)
        const [resultado] = await database.listar(expect.id)
        deepEqual(resultado, expect)
    })

    it('deve remover um pokemon do arquivo por id', async()=>{
        const expect = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRO.id)
        deepEqual(resultado, expect)
        console.log(resultado)
    })

    it.only('deve atualizar um pokemon pelo id', async()=>{
        const expect={
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Squirtle',
            tipo: 'Água',
            Habilidade1: 'Hidrobomba',
            Habilidade2: 'Pulso de água'
        }

        const novoDado={
            nome: 'Squirtle',
            tipo: 'Água',
            Habilidade1: 'Hidrobomba',
            Habilidade2: 'Pulso de água'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)

        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(resultado, expect)
        console.log(resultado, expect)
    })

})
