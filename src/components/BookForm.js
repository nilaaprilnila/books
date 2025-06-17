import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setAuthor(initialData?.author || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Buku"
          required
        />
      </div>

      <div>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nama Penulis"
          required
        />
      </div>

      <button type="submit">Simpan</button>
    </form>
  );
}
