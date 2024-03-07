const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Criar tabela para armazenar URLs de imagens
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS images (url TEXT)');
});

// Inserir URLs de imagens (substitua estas URLs por suas próprias)
const catImageUrls = [
    'https://i.ibb.co/px6VdGx/Cat-logo-SOSPet-Pinheiro-Apadrinhar-14.png',
    'https://i.ibb.co/h1xkDqp/Cat-logo-SOSPet-Pinheiro-Apadrinhar-13.png',
    'https://i.ibb.co/QJP1n4k/Cat-logo-SOSPet-Pinheiro-Apadrinhar-12.png',
    'https://i.ibb.co/441hJZy/Cat-logo-SOSPet-Pinheiro-Apadrinhar-11.png',
    'https://i.ibb.co/HnwBCCp/Cat-logo-SOSPet-Pinheiro-Apadrinhar-10.png',
    'https://i.ibb.co/hckQLJQ/Cat-logo-SOSPet-Pinheiro-Apadrinhar-9.png',
    'https://i.ibb.co/XjHWx14/Cat-logo-SOSPet-Pinheiro-Apadrinhar-8.png',
    'https://i.ibb.co/PGmYgyR/Cat-logo-SOSPet-Pinheiro-Apadrinhar-7.png',
    'https://i.ibb.co/SKwQ7pJ/Cat-logo-SOSPet-Pinheiro-Apadrinhar-6.png',
    'https://i.ibb.co/Rgm2GJW/Cat-logo-SOSPet-Pinheiro-Apadrinhar-5.png',
    'https://i.ibb.co/G3twFbV/Cat-logo-SOSPet-Pinheiro-Apadrinhar-4.png',
    'https://i.ibb.co/3NRgbb0/Cat-logo-SOSPet-Pinheiro-Apadrinhar-3.png',
    'https://i.ibb.co/27gZVS6/Cat-logo-SOSPet-Pinheiro-Apadrinhar-2.png',
    'https://i.ibb.co/bBf9M5m/Cat-logo-SOSPet-Pinheiro-Apadrinhar-1.png',
    'https://i.ibb.co/9rwvp9N/Cat-logo-SOSPet-Pinheiro-Apadrinhar.png'
    // Adicione mais URLs conforme necessário
];
catImageUrls.forEach(url => {
    db.run('INSERT INTO images (url) VALUES (?)', [url]);
});

// Fechar conexão com o banco de dados quando terminar
db.close();
