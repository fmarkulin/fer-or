"use server";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Book } from "@/models/Book";
import { BookExport } from "@/models/BookExport";
import { Author } from "@/models/Author";

const getBooks = async () => {
  try {
    const booksRef = collection(db, "books");
    const booksSnapshot = await getDocs(booksRef);
    const books: Book[] = [];
    booksSnapshot.forEach((doc) => {
      books.push(doc.data() as Book);
    });

    const authorsRef = collection(db, "authors");
    const authorsSnapshot = await getDocs(authorsRef);
    const authors: Author[] = [];
    authorsSnapshot.forEach((doc) => {
      authors.push(doc.data() as Author);
    });

    const data: BookExport[] = books
      .map((book) => {
        const bookAuthors: (Author | undefined)[] = book.authors.map((author) =>
          authors.find((a) => a.key === author)
        );
        return {
          ...book,
          authors: bookAuthors,
        };
      })
      // .sort((a, b) => a.title.localeCompare(b.title));

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("error fetching data");
  }
};

export { getBooks };
