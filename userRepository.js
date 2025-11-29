import db from '../config/database.js';

const runQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function runCallback(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });

const getQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });

const allQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });

export const findAllUsers = () => allQuery('SELECT * FROM users');

export const findUserById = (id) =>
  getQuery('SELECT * FROM users WHERE id = ?', [id]);

export const findUserByEmail = (email) =>
  getQuery('SELECT * FROM users WHERE email = ?', [email]);

export const createUser = ({ name, email, password }) =>
  runQuery('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    password,
  ]);

export const updateUser = ({ id, name, email, password }) =>
  runQuery(
    'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
    [name, email, password, id]
  );

export const deleteUser = (id) =>
  runQuery('DELETE FROM users WHERE id = ?', [id]);


