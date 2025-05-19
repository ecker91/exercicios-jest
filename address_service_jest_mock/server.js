const http = require('http');
const { parse } = require('querystring');
const UsuarioController = require('./controllers/UsuarioController');

// Função para processar as requisições
const requestListener = (req, res) => {
  // Configurando os cabeçalhos da resposta
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/usuarios') {
    UsuarioController.getUsuarios(req, res);
  } else if (req.method === 'POST' && req.url === '/usuarios') {
    let body = '';

    // Coleta os dados do corpo da requisição
    req.on('data', chunk => {
      body += chunk;
    });

    // Quando o corpo estiver completo
    req.on('end', () => {
      const usuarioData = JSON.parse(body);
      UsuarioController.createUsuario(req, res, usuarioData);
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
  }
};

// Criando o servidor HTTP
const server = http.createServer(requestListener);

// Ouvindo na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
