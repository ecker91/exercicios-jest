class Imovel {
    constructor(id, cep, bairro, preco, status, proprietarioId, endereco) {
        this.id = id;
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.preco = preco;
        this.status = status;
        this.proprietarioId = proprietarioId;
    }
}

module.exports = Imovel;