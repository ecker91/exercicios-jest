class PagamentoService {
    processarPagamento(pedido) {
        console.log('Validando pagamento do pedido:', pedido.id);
        // Simula uma validação de pagamento
        if (pedido.valor > 0) {
            console.log('Pagamento aprovado para o pedido:', pedido.id);
            return true;
        }
        console.log('Pagamento reprovado para o pedido:', pedido.id);
        return false;
    }
}

module.exports = PagamentoService;
