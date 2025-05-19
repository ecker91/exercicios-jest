const UsuarioRepository = require("../repositories/UsuarioRepository");

class UsuarioController {

    constructor(repository){
        this.usuarioRepository = repository;
    }
  // Método GET para listar todos os usuários
  getUsuarios() {
    try {
      const usuarios = this.usuarioRepository.getUsuarios();
      return usuarios; // Retorna a lista de usuários
    } catch (error) {
      throw Error("Não foi possível se conectar ao banco.");
    }
  }

  // Método POST para criar um novo usuário
  createUsuario(req) {
    const { nome, email, senha, documento } = req.body;

    try {
      const usuario = this.usuarioRepository.createUsuario({
        nome,
        email,
        senha,
        documento,
      });
      return { status: 201, body: usuario };
    } catch (error) {
      return { status: 500, body: "Não foi possível criar usuário" };
    }
  }
}

module.exports = UsuarioController;
