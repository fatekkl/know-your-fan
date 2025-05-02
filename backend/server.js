// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./fan_data.db');

db.run(`CREATE TABLE IF NOT EXISTS fans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  cpf TEXT,
  birthDate TEXT,
  address TEXT,
  documentInfo TEXT,
  socialData TEXT
)`);

app.post('/api/save', (req, res) => {
  const { fanData, documentInfo, socialData } = req.body;

  db.run(
    `INSERT INTO fans (name, email, cpf, birthDate, address, documentInfo, socialData) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      fanData.name,
      fanData.email,
      fanData.cpf,
      fanData.birthDate,
      JSON.stringify(fanData.address),
      JSON.stringify(documentInfo),
      JSON.stringify(socialData)
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erro ao salvar os dados' });
      }
      res.status(200).json({ success: true, id: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
