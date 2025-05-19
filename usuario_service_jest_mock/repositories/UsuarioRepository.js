const Usuario = require('../models/Usuario');

// Simulando um banco de dados em memória
let usuariosDB = [];

class UsuarioRepository {
    // Método para criar um novo usuário
    createUsuario(data) {
        const usuario = new Usuario(data.nome, data.email, data.senha, data.documento);
        if (!usuariosDB.find(u => u.nome == data.nome)){
            usuariosDB.push(usuario);
            console.log('Usuário criado:', usuario);
            return usuario;
        }else{
            throw Error("Usuário já existe");
        }
    }
    
    // Método para obter todos os usuários
    async getUsuarios() {
        console.log('Obtendo usuários...');
        return usuariosDB;
    }
}

module.exports = UsuarioRepository;
