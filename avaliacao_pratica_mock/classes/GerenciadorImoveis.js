const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const FCM_SERVER_KEY = 'FCM_KEY_TOKEN';

class GerenciadorImoveis {
    constructor() {
        this.imoveis = [];
    }

    adicionarImovel(imovel) {
        this.validarImovel(imovel);

        // Buscar endereço por CEP
        const endereco = this.buscarEnderecoPorCep(imovel.cep);
        if (!endereco) {
            throw new Error("Endereço não encontrado para o CEP informado.");
        }

        imovel.endereco = `${endereco.logradouro}, ${endereco.bairro} - ${endereco.localidade}/${endereco.uf}`;

        this.imoveis.push(imovel);

        // Notificar o proprietário
        this.enviarNotificacao(imovel.proprietarioId, `Seu imóvel em ${imovel.endereco} foi cadastrado com sucesso!`);

        return imovel;
    }

    validarImovel(imovel) {
        if (!imovel.cep || typeof imovel.cep !== 'string') {
            throw new Error("CEP inválido.");
        }
        if (!imovel.bairro || typeof imovel.bairro !== 'string') {
            throw new Error("Bairro inválido.");
        }
        if (typeof imovel.preco !== 'number' || imovel.preco <= 0) {
            throw new Error("Preço inválido.");
        }
        if (imovel.status !== 'disponível' && imovel.status !== 'indisponível') {
            throw new Error("Status inválido.");
        }
    }

    buscarEnderecoPorCep(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    console.error('CEP inválido ou não encontrado');
                    return null;
                }
                return data;
            })
            .catch(error => {
                console.error('Erro ao buscar endereço:', error.message);
                return null;
            });
    }

    enviarNotificacao(tokenDispositivo, titulo, mensagem) {
        const url = 'https://fcm.googleapis.com/fcm/send';

        const payload = {
            to: tokenDispositivo,
            notification: {
                title: titulo,
                body: mensagem
            }
        };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `key=${FCM_SERVER_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(erro => {
                        console.error('Erro ao enviar notificação:', erro);
                        throw new Error('Falha ao enviar notificação.');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Notificação enviada com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro:', error.message);
            });
    }

    buscarImoveisPorBairro(bairro) {
        return this.imoveis.filter(imovel =>
            imovel.bairro.toLowerCase() === bairro.toLowerCase()
        );
    }

    listarImoveisDisponiveis() {
        return this.imoveis.filter(imovel =>
            imovel.status.toLowerCase() === 'disponível'
        );
    }
}

module.exports = GerenciadorImoveis;
