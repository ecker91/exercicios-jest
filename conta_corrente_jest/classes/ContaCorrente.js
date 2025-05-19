class ContaCorrente {
    #balanco;
    #nome;

    constructor(nome, balancoInicial) {
        this.#nome = nome;
        this.#balanco = balancoInicial;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get balanco() {
        return this.#balanco;
    }

    set balanco(novoBalanco) {
        if (novoBalanco >= 0) {
            this.#balanco = novoBalanco;
        } else {
            console.log("O saldo não pode ser negativo.");
        }
    }

    depositar(valor) {
        if (valor > 0) {
            this.#balanco += valor;
            console.log(`Depósito de R$${valor} realizado. Novo saldo: R$${this.#balanco}`);
        } else {
            console.log("O valor do depósito deve ser positivo.");
        }
    }

    sacar(valor) {
        if (valor > 0 && this.#balanco >= valor) {
            this.#balanco -= valor;
            console.log(`Saque de R$${valor} realizado. Novo saldo: R$${this.#balanco}`);
            return true;
        } else {
            console.log("Saque inválido. Verifique o saldo disponível.");
            return false;
        }
    }
}

module.exports = ContaCorrente;
