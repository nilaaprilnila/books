import { useRouter } from "next/router";
import BookForm from "../../components/BookForm";
import { createBooks } from "../../../lib/api/books";
import { useState } from "react";  // <-- ini perlu agar useState tidak error

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    if (res.ok) router.push("/books");
  };

  const addBook = async (book) => {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    router.push("/books");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white shadow-xl rounded-3xl max-w-lg w-full p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tambah Buku Baru
        </h1>
        <BookForm onSubmit={addBook} />
      </div>
    </div>
  );
}
