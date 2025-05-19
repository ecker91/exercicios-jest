const Calculadora = require("./classes/Calculadora")

describe('Testes da Calculadora', () => {
    test('Deve somar dois números', () => {
        calc = new Calculadora()
        resultado = calc.somar(2,3)
        expect(resultado).toBe(5)
    })
    
    test('Deve subtrair dois números', () => {
        calc = new Calculadora()
        resultado = calc.subtrair(4,3)
        expect(resultado).toBe(1)
    })
    
    test('Deve multiplicar dois números', () => {
        calc = new Calculadora()
        resultado = calc.multiplicar(2,3)
        expect(resultado).toBe(6)
    })
    
    test('Deve dividir dois números', () => {
        calc = new Calculadora()
        resultado = calc.dividir(6,3)
        expect(resultado).toBe(2)
    })
    
    test('Deve dar erro ao dividir por zero', () => {
        calc = new Calculadora()
        expect(()=>calc.dividir(3,0)).toThrow(Error)
    })
})



