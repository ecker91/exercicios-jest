const AddressProvider = require('./AddressProvider');

class AddressService {
    constructor(enderecoProvider){
        this.provider = enderecoProvider
    }
    // Método para obter um endereço a partir de um CEP
    obterEndereco(cep) {
        if (!/^\d{8}$/.test(cep)) {
            throw new Error("CEP inválido! Deve conter 8 dígitos numéricos.");
        }

        return this.provider.buscarEnderecoPorCEP(cep);
    }
}

module.exports = AddressService;
