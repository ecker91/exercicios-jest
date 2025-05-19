const GeometriaService = require("./classes/GeometriaService");

describe('Testes de Serviço de Geometria', () => {
    beforeAll(() => {
        geo = new GeometriaService()
    });

    test('Area de um triângulo', () => {
        area = geo.areaTriangulo(2.0,2.0)
        expect(area).toBe(2.0)
    })

    test('Area de um circulo', () => {
        area = geo.areaCircunferencia(2.0)  
        expect(area).toBeCloseTo(12.6,1)
    });
    
    test('Area de um quadrado', () => {
        area = geo.areaQuadrado(2.0)
        expect(area).toBe(4.0)
    });

    test('Area de um retângulo', () => {
        area = geo.areaRetangulo(2.0,3.0)
        expect(area).toBe(6.0)
    });

    test('Volume de um cubo', () => {
        volume = geo.volumeCubo(2.0)
        expect(volume).toBe(8.0)
    });

    test('Volume de um cilindro', () => {
        volume = geo.volumeCilindro(2.0,2.0)
        expect(volume).toBeCloseTo(25.1,1)
    });

    test('Volume de uma esfera', () => {
        volume = geo.volumeEsfera(2.0)
        expect(volume).toBeCloseTo(33.5,1)
    });
});