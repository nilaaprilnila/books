import { useEffect, useState } from "react";
import Link from 'next/link';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => setError(err.message || 'Gagal memuat data buku'));
  }, []);

  const deleteBook = async (id) => {
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(b => b.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message || 'Gagal menghapus buku');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title &&
    typeof book.title === 'string' &&
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Daftar Buku</h1>
        <Link
          href="/books/add"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow transition-all"
        >
          + Tambah Buku
        </Link>
      </div>

      <input
        type="text"
        placeholder="🔍 Cari judul buku..."
        className="w-full mb-6 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">Belum ada buku yang ditemukan.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBooks.map(b => (
            <li key={b.id} className="flex justify-between items-start p-5 border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-all">
              <div>
                <Link
                  href={`/books/${b.id}`}
                  className="block text-lg font-semibold text-blue-700 hover:underline"
                >
                  {b.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1">🖋️ oleh {b.author}</p>
              </div>
              <div className="flex space-x-3 mt-2 sm:mt-0">
                <Link
                  href={`/books/${b.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-lg transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(b.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-lg transition"
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
