// NotificacaoService.js
class NotificacaoService {
    enviarNotificacao(pedido) {
        console.log(`Enviando notificação para o usuário do pedido: ${pedido.id}`);
        console.log(`Notificação: Pedido ${pedido.id} foi processado com sucesso!`);
        return true;
    }
}

module.exports = NotificacaoService;
