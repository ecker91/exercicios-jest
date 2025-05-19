const EnderecoProvider = require("../services/AddressProvider");
const AddressService = require("../services/AddressService");

describe("Mocks de testes de busca de CEP", () => {
  test("CEP valido e retornado com sucesso", () => {
    const instanciaProvider = new EnderecoProvider();
    const mockProvider = jest
      .spyOn(instanciaProvider, "buscarEnderecoPorCEP")
      .mockReturnValue("Mockado!");

    const instanciaService = new AddressService(instanciaProvider);

    const cepDummy = 88000000;

    let resultado = instanciaService.obterEndereco(cepDummy);
    expect(resultado).toBe("Mockado!");
    expect(mockProvider).toHaveBeenCalled();
  });

  test("CEP valido e endereço não é retornado", () => {
    const instanciaProvider = new EnderecoProvider();
    const mockProvider = jest
      .spyOn(instanciaProvider, "buscarEnderecoPorCEP")
      .mockImplementation(() => {
        throw new Error("CEP não encontrado.");
      });

    const instanciaService = new AddressService(instanciaProvider);

    const cepDummy = 88000000;
    expect(() => instanciaService.obterEndereco(cepDummy)).toThrow(
      "CEP não encontrado."
    );
    expect(mockProvider).toHaveBeenCalled();
  });

  test("CEP invalido", () => {
    const instanciaProvider = new EnderecoProvider();
    const mockProvider = jest
      .spyOn(instanciaProvider, "buscarEnderecoPorCEP")
      .mockReturnValue("Mockado!");

    const instanciaService = new AddressService(instanciaProvider);

    const cepDummy = 880000;

    expect(() => instanciaService.obterEndereco(cepDummy)).toThrow(
      "CEP inválido! Deve conter 8 dígitos numéricos."
    );
    expect(mockProvider).not.toHaveBeenCalled();
  });

  test("Erro de conexão com API Via CEP", () => {
    const instanciaProvider = new EnderecoProvider();
    const mockProvider = jest
      .spyOn(instanciaProvider, "buscarEnderecoPorCEP")
      .mockImplementation(() => {
        throw new Error("Erro ao buscar endereço.");
      });

    const instanciaService = new AddressService(instanciaProvider);

    const cepDummy = 88000000;
    expect(() => instanciaService.obterEndereco(cepDummy)).toThrow(
      "Erro ao buscar endereço."
    );
    expect(mockProvider).toHaveBeenCalled();
  });
});
