// import fs from 'fs';
// import path from 'path';
// import { books } from '../../../../data';

// export default async function handler(req, res) {
//   const { method } = req;

//   const isBackendAvailable = async () => {
//     try {
//       const ping = await fetch(`${BACKEND_URL}/ping`);
//       return ping.ok;
//     } catch {
//       return false;
//     }
//   };

//   const useBackend = await isBackendAvailable();

//   switch (method) {
//     case 'GET':
//       if (useBackend) {
//         try {
//           const fetchRes = await fetch(`${BACKEND_URL}/books`);
//           const data = await fetchRes.json();
//           return res.status(fetchRes.status).json(data);
//         } catch (err) {
//           return res.status(500).json({ message: 'Gagal mengambil data dari backend' });
//         }
//       } else {
//         return res.status(200).json(books);
//       }

//     case 'POST': {
//       const { title, author } = req.body;

//       if (useBackend) {
//         try {
//           const fetchRes = await fetch(`${BACKEND_URL}/books`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title, author }),
//           });
//           const data = await fetchRes.json();
//           return res.status(fetchRes.status).json(data);
//         } catch (err) {
//           return res.status(500).json({ message: 'Gagal menambahkan data ke backend' });
//         }
//       } else {
//         const newBook = { id: Date.now(), title, author };
//         books.push(newBook);

//         const filepath = path.join(process.cwd(), 'data.js');
//         const updatedData = `export const books = ${JSON.stringify(books, null, 2)};`;
//         fs.writeFileSync(filepath, updatedData, 'utf8');

//         return res.status(201).json(newBook);
//       }
//     }

//     default:
//       return res.status(405).json({ message: 'Metode tidak diizinkan' });
//   }
// }

import mysql from 'mysql2/promise';

const dbConfig = {
  host: '0.0.0.0',
  user: 'root',
  password: '', // ganti sesuai konfigurasi MySQL kamu
  database: 'books' // ganti dengan nama database kamu
};

async function getBooksFromMySQL() {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM books');
  await conn.end();
  return rows;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await getBooksFromMySQL();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengambil buku', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method tidak diizinkan' });
  }
}
