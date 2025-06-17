// lib/api/books.js
export async function getBooks() {
    const res = await fetch('/api/books');
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gagal mengambil data buku: ${res.status} - ${errorText}`);
    }
    return res.json();
  }
  
  export async function addBook(book) {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gagal menambahkan buku: ${res.status} - ${errorText}`);
    }
  
    return res.json();
  }
  
