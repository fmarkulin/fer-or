"use server";

import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookExport } from "@/models/BookExport";
import { collection, getDocs } from "firebase/firestore";
import * as fs from "fs";

const handleCommas = (input: any) => {
  if (typeof input === "string" && (input as string).includes(","))
    return `"${input}"`;
  else return input;
};

const refreshDumps = async () => {
  console.log("Refreshing dumps...");
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

    const booksExport: BookExport[] = books.map((book) => {
      const bookAuthors: (Author | undefined)[] = book.authors.map((author) =>
        authors.find((a) => a.key === author)
      );
      return {
        ...book,
        authors: bookAuthors,
      };
    });

    const header =
      "last_modified,publisher,title,author_key,author_type,author_revision,author_last_modified,author_name,publish_date,type,key,subject,latest_revision,revision,number_of_pages\n";
    const rows = booksExport.flatMap((book) =>
      book.publishers.flatMap((publisher) =>
        book.authors.flatMap((author) =>
          book.subjects.map((subject) => [
            handleCommas(book.last_modified),
            handleCommas(publisher),
            handleCommas(book.title),
            handleCommas(author?.key),
            handleCommas(author?.type),
            handleCommas(author?.revision),
            handleCommas(author?.last_modified),
            handleCommas(author?.name),
            handleCommas(book.publish_date),
            handleCommas(book.type),
            handleCommas(book.key),
            handleCommas(subject),
            handleCommas(book.latest_revision),
            handleCommas(book.revision),
            handleCommas(book.number_of_pages),
          ])
        )
      )
    );
    const csv = header + rows.map((row) => row.join(",")).join("\n");

    fs.writeFileSync(
      "./public/books.json",
      JSON.stringify(booksExport, null, 2),
      "utf-8"
    );
    fs.writeFileSync("./public/books.csv", csv, "utf-8");
  } catch (e) {
    console.error(e);
  }
};

export default refreshDumps;
