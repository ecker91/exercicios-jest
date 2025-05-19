class User {
    constructor(document, name, email, password, confirmPassword, cep) {
        this.document = document;
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.cep = cep;
        this.validate();
    }

    validate() {
        if (!this.document || !this.name || !this.email || !this.password || !this.confirmPassword || !this.cep) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (!this.validateEmail(this.email)) {
            throw new Error("E-mail inválido.");
        }

        if (!this.validateCEP(this.cep)) {
            throw new Error("CEP inválido.");
        }

        if (!this.validateCPF(this.document) && !this.validateCNPJ(this.document)) {
            throw new Error("Documento deve ser um CPF ou CNPJ válido.");
        }

        if (this.password.length < 8) {
            throw new Error("A senha deve ter pelo menos 8 caracteres.");
        }

        if (this.password !== this.confirmPassword) {
            throw new Error("As senhas não coincidem.");
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validateCEP(cep) {
        const regex = /^\d{5}-?\d{3}$/;
        return regex.test(cep);
    }

    validateCPF(cpf) {
        cpf = cpf.replace(/[.-]/g, "");
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        return true;
    }

    validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/[.\-\/]/g, "");        
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
        
        return true;
    }
}

module.exports = User