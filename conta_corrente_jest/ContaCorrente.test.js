const ContaCorrente = require("./classes/ContaCorrente")

describe('Testes da classe Conta Corrente', () => {
  beforeEach(()=>{
    contaMaria = new ContaCorrente('Maria',200)
    contaJose = new ContaCorrente('José',100)
  })

  test('Se as contas foram criadas corretamentes', () => {
    expect(contaMaria).toBeDefined()
    expect(contaJose).toBeDefined()       
  })
  
  test('Saldo da conta da Maria deve ser diferente da do José.', () => {
    saldoMaria = contaMaria.balanco
    saldoJose = contaJose.balanco
    expect(saldoJose == saldoMaria).toBeFalsy()
  })

  test('Ao realizar um saque de R$100 na conta da Maria, o valor de saldo deve ser igual ao saldo do José', () => {
    contaMaria.sacar(100)
    saldoMaria = contaMaria.balanco
    saldoJose = contaJose.balanco
    expect(saldoMaria == saldoJose).toBeTruthy()
  })
  test('Ao realizar um depósito na conta do José, de R$50, o saldo na sua conta será igual a R$50 a menos o saldo na conta da Maria.', () => {
    contaJose.depositar(50)
    saldoMaria = contaMaria.balanco
    saldoJose = contaJose.balanco
    diferencaSaldos = saldoMaria - saldoJose
    expect(diferencaSaldos).toBe(50)    
  })
  test('Ao tentar sacar um valor acima do disponível em conta deverá retornar False.', () => {
    expect(contaJose.sacar(150)).toBeFalsy()    
  })
  test('Ao tentar sacar um valor disponível, retornar True.', () => {
    expect(contaMaria.sacar(150)).toBeTruthy()
  })
})