class GerenciadorImoveis {
    constructor() {
        this.imoveis = [];
    }

    // Validação simples dos dados do imóvel
    validarImovel(imovel) {
        if (!imovel.endereco || typeof imovel.endereco !== 'string') {
            throw new Error("Endereço inválido.");
        }
        if (!imovel.bairro || typeof imovel.bairro !== 'string') {
            throw new Error("Bairro inválido.");
        }
        if (typeof imovel.preco !== 'number' || imovel.preco <= 0) {
            throw new Error("Preço inválido. Deve ser um número maior que zero.");
        }
        if (imovel.status !== 'disponível' && imovel.status !== 'indisponível') {
            throw new Error("Status inválido. Deve ser 'disponível' ou 'indisponível'.");
        }
        return true;
    }

    // Adiciona o imóvel se for válido
    adicionarImovel(imovel) {
        this.validarImovel(imovel);
        this.imoveis.push(imovel);
    }

    // Retorna imóveis de um bairro específico
    buscarImoveisPorBairro(bairro) {
        return this.imoveis.filter(imovel =>
            imovel.bairro.toLowerCase() === bairro.toLowerCase()
        );
    }

    // Retorna todos os imóveis disponíveis
    listarImoveisDisponiveis() {
        return this.imoveis.filter(imovel =>
            imovel.status.toLowerCase() === 'disponível'
        );
    }

    // Retorna todos os imóveis 
    listarImoveis() {
        return this.imoveis;
    }
}

module.exports = GerenciadorImoveis;