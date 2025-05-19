const UsuarioRepository = require("../repositories/UsuarioRepository");
const UsuarioController = require("../controllers/UsuarioController");

describe("Dublê de Testes de Usuario", () => {
  test("Criando usuario caso não exista no repositorio", () => {
    const usuarioRepository = new UsuarioRepository();
    const usuarioDummy = {
      nome: "Teste",
      email: "teste@mail.com",
      documento: "CPF",
      senha: "123",
    };
    const mockRepository = jest
      .spyOn(usuarioRepository, "createUsuario")
      .mockReturnValue(usuarioDummy);
    const usuarioController = new UsuarioController(usuarioRepository);

    const req = { body: usuarioDummy };
    const res = { body: "teste" };
    resultado = usuarioController.createUsuario(req, res);

    expect(resultado.status).toBe(201);
    expect(resultado.body).toBe(usuarioDummy);
    expect(mockRepository).toHaveBeenCalled();
  });

  test("Usuário já existe, falha ao criar.", () => {
    const usuarioRepository = new UsuarioRepository();
    const mockRepository = jest
      .spyOn(usuarioRepository, "createUsuario")
      .mockImplementation(() => {
        throw new Error();
      });

    const usuarioController = new UsuarioController(usuarioRepository);

    const req = { body: "teste" };
    const res = { body: "teste" };
    resultado = usuarioController.createUsuario(req, res);

    expect(resultado.status).toBe(500);
    expect(resultado.body).toBe("Não foi possível criar usuário");
    expect(mockRepository).toHaveBeenCalled();
  });
});
