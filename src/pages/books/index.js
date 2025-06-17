import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooks, deleteBook } from '../../../lib/api/books';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error("Format data tidak dikenali:", data);
          setBooks([]);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data buku:", err);
        setBooks([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-sky-700">📚 Koleksi Buku</h1>
          <Link
            href="/books/add"
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl shadow font-semibold transition"
          >
            + Tambah Buku
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg font-medium">Belum ada buku yang ditambahkan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
              <thead>
                <tr className="bg-sky-100 text-sky-800 text-left">
                  <th className="px-4 py-3 font-semibold border-b">No</th>
                  <th className="px-4 py-3 font-semibold border-b">Judul Buku</th>
                  <th className="px-4 py-3 font-semibold border-b">Penulis</th>
                  <th className="px-4 py-3 font-semibold border-b">Genre</th>
                  <th className="px-4 py-3 font-semibold border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b font-medium text-gray-800">{book.title}</td>
                    <td className="px-4 py-3 border-b">{book.author}</td>
                    <td className="px-4 py-3 border-b">{book.genre || '-'}</td>
                    <td className="px-4 py-3 border-b">
                      <div className="flex gap-2">
                        <Link
                          href={`/books/${book.id}`}
                          className="bg-green-400 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
