class GeometriaService {
    // Área do triângulo: (base * altura) / 2
    areaTriangulo(base, altura) {
        return (base * altura) / 2;
    }

    // Área do quadrado: lado * lado
    areaQuadrado(lado) {
        return lado * lado;
    }

    // Área do retângulo: base * altura
    areaRetangulo(base, altura) {
        return base * altura;
    }

    // Área da circunferência: π * raio^2
    areaCircunferencia(raio) {
        return Math.PI * Math.pow(raio, 2);
    }

    // Volume da esfera: (4/3) * π * raio^3
    volumeEsfera(raio) {
        return (4 / 3) * Math.PI * Math.pow(raio, 3);
    }

    // Volume do cubo: lado^3
    volumeCubo(lado) {
        return Math.pow(lado, 3);
    }

    // Volume do cilindro: π * raio^2 * altura
    volumeCilindro(raio, altura) {
        return Math.PI * Math.pow(raio, 2) * altura;
    }
}

module.exports = GeometriaService;
