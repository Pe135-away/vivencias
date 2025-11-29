import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../../data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erro ao conectar ao banco SQLite3:', error.message);
    throw error;
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`
  );
});

export default db;

