const PagamentoService = require('./PagamentoService');
const NotificacaoService = require('./NotificacaoService');

class PedidoService {
    constructor(pagamentoService, notificacaoService) {
        this.pagamentoService = pagamentoService;
        this.notificacaoService = notificacaoService;
    }

    fecharPedido(pedido) {
        console.log(`Tentando fechar o pedido ${pedido.id}...`);

        // Valida o pagamento
        const pagamentoValido = this.pagamentoService.processarPagamento(pedido);

        // Se o pagamento for válido, envia a notificação
        if (pagamentoValido) {
            console.log(`Pedido ${pedido.id} fechado com sucesso!`);
            this.notificacaoService.enviarNotificacao(pedido);
            return true;
        } else {
            throw Error(`Pedido ${pedido.id} não pôde ser fechado. Pagamento inválido.`);
        }
    }
}

module.exports = PedidoService;
