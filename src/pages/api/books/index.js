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

const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const fetchRes = await fetch(`${BACKEND_URL}/books`);
      const data = await fetchRes.json();

      // Pastikan yang dikirim ke frontend adalah array buku
      const books = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);

      return res.status(fetchRes.status).json(books);
    }
    case 'POST': {
      const fetchRes = await fetch(`${BACKEND_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await fetchRes.json();
      return res.status(fetchRes.status).json(data);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
