import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [author, setAuthor] = useState(initialData?.author || "");

    useEffect(() => {
        setTitle(initialData?.title || "");
        setAuthor(initialData?.author || "");
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-6 max-w-xl mx-auto"
        >
            

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Buku
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul buku"
                    className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                />
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Penulis
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Masukkan nama penulis"
                    className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md"
            >
                 Simpan Buku
            </button>
        </form>
    );
}
