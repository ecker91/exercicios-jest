const GerenciadorImoveis = require("../classes/GerenciadorImoveis");
const Imovel = require("../classes/Imovel");

describe('Testes Unitarios de classe GerenciadorImoveis', () => {
    
//Instancia da classe
const gerenciadorImoveis = new GerenciadorImoveis()
//Imovel base para testes positivos
let imovel = new Imovel(1,"88015000","centro",1000000,'disponível',1,'Rua Marechal Guilherme, 102.')

    test('Adcionando imovel com sucesso', () => {
        gerenciadorImoveis.adicionarImovel(imovel)

        let lista = gerenciadorImoveis.listarImoveis()
        expect(lista[0]).toBe(imovel)
    });
        
    test('Buscar imoveis por bairro com sucesso', () => {
        let listaBairro = gerenciadorImoveis.buscarImoveisPorBairro('Centro')

        expect(listaBairro[0]).toBe(imovel)
    });

    test('Buscar imoveis por bairro sem sucesso', () => {
        let listaBairro = gerenciadorImoveis.buscarImoveisPorBairro('Coqueiros')
        console.log(listaBairro);
        
        expect(listaBairro.length).toBe(0)
        
    });

    test('Listagem de imóveis disponiveis com sucesso', () => {
        let listaDisponivel = gerenciadorImoveis.listarImoveisDisponiveis()

        expect(listaDisponivel[0]).toBe(imovel)
    });

    test('Listagem geral com sucesso', () => {
        let listaGeral = gerenciadorImoveis.listarImoveisDisponiveis()

        expect(listaGeral[0]).toBe(imovel)
    });


    //Casos de erro para inserção de imovel com dados inválidos

    test('Endereço invalido', () => {
        let novoImovel = new Imovel(1,"88015000","centro",1000000,'disponível',1,'')

        expect(() => gerenciadorImoveis.adicionarImovel(novoImovel)).toThrow("Endereço inválido.")
    });

    test('Bairro invalido', () => {
        let novoImovel = new Imovel(1,"88015000","",1000000,'disponível',1,'Rua Marechal Guilherme, 102.')

        expect(() => gerenciadorImoveis.adicionarImovel(novoImovel)).toThrow("Bairro inválido.")
    });


    test('Status invalido ', () => {
        let novoImovel = new Imovel(1,"88015000","centro",1000000,'disponivel',1,'Rua Marechal Guilherme, 102.')
        
        expect(() => gerenciadorImoveis.adicionarImovel(novoImovel)).toThrow("Status inválido. Deve ser 'disponível' ou 'indisponível'.")
    });


    test('Preço inválido', () => {
        let novoImovel = new Imovel(1,"88015000","centro","Um milhão de reais",'disponível',1,'Rua Marechal Guilherme, 102.')
    
        expect(() => gerenciadorImoveis.adicionarImovel(novoImovel)).toThrow("Preço inválido. Deve ser um número maior que zero.")
    });

});
