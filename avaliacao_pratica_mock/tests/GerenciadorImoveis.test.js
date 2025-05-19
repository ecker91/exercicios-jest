const GerenciadorImoveis = require("../classes/GerenciadorImoveis");
const Imovel = require("../classes/Imovel");

describe('Testes de "adcionarImovel" com Mocks', () => {

const gerenciadorImovels = new GerenciadorImoveis()
//Imovel base para testes
let imovel = new Imovel(1,"88015000","centro",1000000,'disponível',1,'Rua Marechal Guilherme, 102.')

const spyNotificaçao = jest.spyOn(gerenciadorImovels, "enviarNotificacao")


    test('Caso de CEP válido', () => {
        const mockCep = jest.spyOn(gerenciadorImovels,"buscarEnderecoPorCep").mockReturnValue(imovel)

        gerenciadorImovels.adicionarImovel(imovel)
            
        //Chamando a lista para comparar
        let lista = gerenciadorImovels.listarImoveisDisponiveis()


        expect(mockCep).toHaveBeenCalledTimes(1)
        expect(lista[0]).toBe(imovel)
        expect(spyNotificaçao).toHaveBeenCalledTimes(1)
    });

    test('Caso API não esteja disponivel', () => {
        const mockCep = jest.spyOn(gerenciadorImovels,"buscarEnderecoPorCep").mockImplementation((error) => {
            throw new Error('Erro ao buscar endereço:',error.message)
        })

        expect(()=> gerenciadorImovels.adicionarImovel(imovel)).toThrow()
        expect(mockCep).toHaveBeenCalledTimes(1)

        //Chamando a lista para comparar
        let lista = gerenciadorImovels.listarImoveisDisponiveis()

        expect(lista.length).toBe(1)
        expect(spyNotificaçao).not.toHaveBeenCalled()
        
        
    });

    test('Caso em que API retorna endereço vazio', () => {
        const mockCep = jest.spyOn(gerenciadorImovels,"buscarEnderecoPorCep").mockReturnValue(null)


        expect(()=> gerenciadorImovels.adicionarImovel(imovel)).toThrow()
        expect(mockCep).toHaveBeenCalledTimes(1)

        //Chamando a lista para comparar
        let lista = gerenciadorImovels.listarImoveisDisponiveis()

        expect(lista.length).toBe(1)
        expect(spyNotificaçao).not.toHaveBeenCalled()
    });

});