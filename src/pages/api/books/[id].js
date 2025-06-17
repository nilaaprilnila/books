// import {books} from '../../../../data';
// import fs from 'fs';
// import path from 'path';
  
//   export default function handler(req, res) {
//     const {
//       id
//     } = req.query;
//     const bookId = parseInt(id, 10);
//     const bookIndex = books.findIndex((book) => book.id === bookId);
  
//     if (req.method === 'GET') {
//       if (bookIndex === -1) {
//         return res.status(404).json({
//           message: 'Book not found'
//         });
//       }
//       res.status(200).json(books[bookIndex]);
//     } else if (req.method === 'PUT') {
//       if (bookIndex === -1) {
//         return res.status(404).json({
//           message: 'Book not found'
//         });
//       }
  
//       const { title, author } = req.body;
//       books[bookIndex] = {
//         ...books[bookIndex],
//         title,
//         author
//       };
  
//       // Update data.js file
//       const filePath = path.join(process.cwd(), 'data.js');
//       const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;
//       fs.writeFileSync(filePath, updatedData, 'utf8');
  
//       res.status(200).json(books[bookIndex]);
//     } else if (req.method === 'DELETE') {
//       if (bookIndex === -1) {
//         return res.status(404).json({ message: 'Book not found' });
//       }
  
//       // Remove the book from the array
//       books.splice(bookIndex, 1);
  
//       // Update data.js file
//       const filePath = path.join(process.cwd(), 'data.js');
//       const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;
//       fs.writeFileSync(filePath, updatedData, 'utf8');
  
//       res.status(200).json({ message: 'Book deleted successfully' });
//     } else {
//       res.setHeader('Allow', ['GET', 'PUT']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }

import mysql from 'mysql2/promise';

const dbConfig = {
  host: '0.0.0.0',
  user: 'root',
  password: '',
  database: 'books' // ganti sesuai nama database kamu
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const [rows] = await conn.execute('SELECT * FROM books WHERE id = ?', [id]);
      await conn.end();

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil buku', error: error.message });
    }
  }

  else if (req.method === 'PUT') {
    const { title, author } = req.body;
    try {
      const conn = await mysql.createConnection(dbConfig);
      await conn.execute(
        'UPDATE books SET title = ?, author = ? WHERE id = ?',
        [title, author, id]
      );
      await conn.end();
      res.status(200).json({ message: 'Buku berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal memperbarui buku', error: error.message });
    }
  }

  else {
    res.status(405).json({ message: 'Method tidak diizinkan' });
  }
}
