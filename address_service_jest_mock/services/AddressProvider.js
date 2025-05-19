const https = require('https');
const Address = require("../models/Address")

class EnderecoProvider {
    buscarEnderecoPorCEP(cep) {
        return new Promise((resolve, reject) => {
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            https.get(url, (res) => {
                let data = '';

                // Recebe os dados da resposta
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // Quando a resposta estiver completa
                res.on('end', () => {
                    const endereco = JSON.parse(data);

                    if (endereco.erro) {
                        reject(new Error("CEP não encontrado."));
                    } else {
                        resolve(new Address(
                            endereco.cep,
                            endereco.logradouro,
                            endereco.bairro,
                            endereco.localidade,
                            endereco.uf
                        ));
                    }
                });
            }).on('error', (error) => {
                reject(new Error("Erro ao buscar endereço."));
            });
        });
    }
}

module.exports = EnderecoProvider;
