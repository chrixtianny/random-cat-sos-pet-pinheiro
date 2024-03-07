const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Pasta onde as imagens estão armazenadas localmente
const localImagesDir = path.join(__dirname, 'images');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public'});
});
// Função para buscar um link de imagem aleatório no banco de dados
const getRandomImageUrlFromDatabase = () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT url FROM images ORDER BY RANDOM() LIMIT 1', (err, row) => {
            if (err || !row || !row.url) {
                reject(err || 'Nenhuma imagem encontrada no banco de dados');
            } else {
                resolve(row.url);
            }
        });
    });
};

// Rota para fornecer o link de uma imagem de gato
app.get('/seugatinho.jpg', async (req, res) => {
    try {
        // Tenta buscar um link de imagem no banco de dados
        const imageUrl = await getRandomImageUrlFromDatabase();
        // Se encontrar o link no banco de dados, redireciona para o link
        res.redirect(imageUrl);
    } catch (error) {
        // Se não conseguir buscar no banco de dados ou se houver um erro, tenta buscar uma imagem localmente
        const localImages = fs.readdirSync(localImagesDir).filter(file => file.endsWith('.jpg'));
        if (localImages.length === 0) {
            // Se não houver imagens no diretório local, retorna um erro
            res.status(404).send('Nenhuma imagem encontrada');
            return;
        }
        // Escolhe uma imagem aleatória do diretório local
        const randomImage = localImages[Math.floor(Math.random() * localImages.length)];
        // Envia o caminho da imagem local como resposta
        res.sendFile(path.join(localImagesDir, randomImage));
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
