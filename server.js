const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.get('/seumiau.jpg', (req, res) => {
    res.redirect('/')
});

// Pasta onde as imagens estão armazenadas localmente
const localImagesDir = path.join(__dirname, 'images');

// Rota para fornecer uma imagem de gato aleatória
app.get('/seugatinho', (req, res) => {
    // Consultar o banco de dados para obter uma URL de imagem aleatória
    db.get('SELECT url FROM images ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err || !row || !row.url) {
            // Se houver erro ao acessar o banco de dados ou se o link não for encontrado, tenta buscar a imagem localmente
            const localImages = fs.readdirSync(localImagesDir).filter(file => file.endsWith('.png'));
            if (localImages.length === 0) {
                // Se não houver imagens no diretório local, retorna um erro
                res.status(404).send('Nenhuma imagem encontrada');
                return;
            }
            // Escolhe uma imagem aleatória do diretório local
            const randomImage = localImages[Math.floor(Math.random() * localImages.length)];
            // Envia o caminho da imagem local como resposta
            res.sendFile(path.join(localImagesDir, randomImage));
        } else {
            // Se encontrar o link no banco de dados, redireciona para o link
            res.redirect(row.url);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
