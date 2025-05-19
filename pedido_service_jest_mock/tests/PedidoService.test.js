// PedidoService.test.js

const PedidoService = require('../classes/PedidoService');
const PagamentoService = require('../classes/PagamentoService');
const NotificacaoService = require('../classes/NotificacaoService');

describe('PedidoService', () => {

  test("pedido realizado com sucesso", () => {
    // GIVEN
    let pagamentoService = new PagamentoService();
    let notificacaoService = new NotificacaoService();

    const mockPagamento = jest.spyOn(pagamentoService, "processarPagamento")
                              .mockReturnValue(true);

    const mockNotificacao = jest.spyOn(notificacaoService, "enviarNotificacao");


    let pedidoService = new PedidoService(pagamentoService, notificacaoService);

    let pedidoDummy = {"pedido": 1}

    // WHEN
    const resultado = pedidoService.fecharPedido(pedidoDummy)

    // THEN
    expect(resultado).toBeTruthy()
    expect(mockPagamento).toHaveBeenCalled()
    expect(mockNotificacao).toHaveBeenCalled()
  })

  test("pedido realizado com falha", () => {
    // GIVEN
    let pagamentoService = new PagamentoService();
    let notificacaoService = new NotificacaoService();

    const mockPagamento = jest.spyOn(pagamentoService, "processarPagamento")
                              .mockReturnValue(false);

    const mockNotificacao = jest.spyOn(notificacaoService, "enviarNotificacao");


    let pedidoService = new PedidoService(pagamentoService, notificacaoService);

    let pedido = {"id": 1}

    // WHEN
    expect(() => {
      pedidoService.fecharPedido(pedido)
    }).toThrow(`Pedido ${pedido.id} não pôde ser fechado. Pagamento inválido.`)

    // THEN
    expect(mockPagamento).toHaveBeenCalled()
    expect(mockNotificacao).not.toHaveBeenCalled()
  })


});

