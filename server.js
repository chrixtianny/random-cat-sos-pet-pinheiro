const express = require('express');

const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Rota para obter uma URL de imagem aleatória
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

app.get('/seumiau.jpg', (req, res) => {
    res.redirect('/')
}
);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
