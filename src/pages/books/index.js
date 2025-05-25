import { useEffect, useState } from "react";
import Link from 'next/link';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Ambil data buku dari API
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => setError(err.message || 'Gagal memuat data buku'));
  }, []);

  // Fungsi untuk menghapus buku
  const deleteBook = async (id) => {
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(b => b.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message || 'Gagal menghapus buku');
    }
  };

  // Filter buku berdasarkan pencarian dengan aman
  const filteredBooks = books.filter(book =>
    book.title &&
    typeof book.title === 'string' &&
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-900">Daftar Buku</h1>
        <Link
          href="/books/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Tambah Buku
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari judul buku..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {error && (
        <div className="text-red-600 text-sm mb-4">{error}</div>
      )}

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada buku.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBooks.map(b => (
            <li key={b.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <div>
                <Link
                  href={`/books/${b.id}`}
                  className="text-xl font-semibold text-blue-700 hover:underline"
                >
                  {b.title}
                </Link>
                <p className="text-sm text-gray-600">oleh {b.author}</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href={`/books/${b.id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(b.id)}
                  className="text-sm bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
