const User = require("./classes/Usuario");

describe('Testes de Cadastro', () => {
    test('Teste com sucesso', () => {
        novoUsuario = new User('999.999.999-05','Fernando',"teste@gmail.com","12345678","12345678","88000-000")
        expect(novoUsuario).toBeTruthy()
    });
    test('Teste com sucesso CNPJ', () => {
        novoUsuario = new User('00.123.456/0001-01','Fernando',"teste@gmail.com","12345678","12345678","88000-000")
        expect(novoUsuario).toBeTruthy()
    });
    test('Senhas não batem', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","12345678","12345679","88000-000")).toThrow("As senhas não coincidem.")
    });
    test('Faltando o nome', () => {
        expect(() => new User('999.999.999-05','',"teste@gmail.com","12345678","12345678","88000-000")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Faltando o email', () => {
        expect(() => new User('999.999.999-05','Fernando',"","12345678","12345678","88000-000")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Faltando a senha', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","","12345678","88000-000")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Faltando a confirmação da senha', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","","12345678","88000-000")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Faltando o CPF', () => {
        expect(() => new User('','Fernando',"teste@gmail.com","12345678","12345678","88000-000")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Faltando o CEP', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","12345678","12345678","")).toThrow("Todos os campos são obrigatórios.")
    });
    test('Email inválido', () => {
        expect(() => new User('999.999.999-05','Fernando',"testegmail.com","12345678","12345678","88000-000")).toThrow("E-mail inválido.")
    });
    test('Senha muito curta', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","1234567","1234567","88000-000")).toThrow("A senha deve ter pelo menos 8 caracteres.")
    });
    test('CPF inválido', () => {
        expect(() => new User('999.999.99','Fernando',"teste@gmail.com","12345678","12345678","88000-000")).toThrow("Documento deve ser um CPF ou CNPJ válido.")
    });
    test('CNPJ inválido', () => {
        expect(() => new User('00.123.456/0001-011','Fernando',"teste@gmail.com","12345678","12345678","88000-000")).toThrow("Documento deve ser um CPF ou CNPJ válido.")
    });
    test('CEP inválido', () => {
        expect(() => new User('999.999.999-05','Fernando',"teste@gmail.com","12345678","12345678","88000-0")).toThrow("CEP inválido.")
    });
});