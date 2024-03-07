const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Rota para fornecer uma imagem de gato aleatória
app.get('/seugatinho.jpg', (req, res) => {
    // Consultar o banco de dados para obter uma URL de imagem aleatória
    db.get('SELECT url FROM images ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        if (!row || !row.url) {
            res.status(404).send('Nenhuma imagem encontrada');
            return;
        }
        // Redirecionar para a URL da imagem armazenada no banco de dados
        res.redirect(row.url);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
