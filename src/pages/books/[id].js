import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getBooks, updateBooks } from '../../../lib/api/books';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({ title: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    router.push('/books');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Edit Buku</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Judul Buku</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Masukkan judul buku"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Penulis</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Masukkan nama penulis"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
