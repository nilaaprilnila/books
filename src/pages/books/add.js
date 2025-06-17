import { useState } from 'react';
import { useRouter } from 'next/router';
import { addBook } from '../../../lib/api/books';

export default function AddBook() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({ title, author, genre });
      router.push('/books');
    } catch (err) {
      console.error('Gagal menambahkan buku:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-sky-700 mb-6">Tambah Buku Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul Buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Nama Penulis"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Genre (Opsional)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold p-3 rounded-xl shadow-lg"
          >
            Simpan Buku 📚
          </button>
        </form>
      </div>
    </div>
  );
}
