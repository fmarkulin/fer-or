import { deleteApp, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import * as fs from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyBnMXECMZCVdBQCfs33imEYJ6k3YkhjUWs",
  authDomain: "fer-or.firebaseapp.com",
  projectId: "fer-or",
  storageBucket: "fer-or.appspot.com",
  messagingSenderId: "421079904660",
  appId: "1:421079904660:web:6142ef00b8f2503281df81",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

declare type Author = {
  name: string;
  last_modified: string;
  key: string;
  type: string;
  revision: number;
};

declare type BookExport = {
  publishers: string[];
  number_of_pages: number;
  latest_revision: number;
  key: string;
  authors: (Author | undefined)[];
  title: string;
  subjects: string[];
  publish_date: string;
  last_modified: string;
  type: string;
  revision: number;
};

declare type Book = {
  publishers: string[];
  number_of_pages: number;
  latest_revision: number;
  key: string;
  authors: string[];
  title: string;
  subjects: string[];
  publish_date: string;
  last_modified: string;
  type: string;
  revision: number;
};

const handleCommas = (input: any) => {
  if (typeof input === "string" && (input as string).includes(","))
    return `"${input}"`;
  else return input;
};

(async () => {
  try {
    console.log("getting books...");
    const booksRef = collection(db, "books");
    const booksSnapshot = await getDocs(booksRef);
    const books: Book[] = [];
    booksSnapshot.forEach((doc) => {
      books.push(doc.data() as Book);
    });

    console.log("getting authors...");
    const authorsRef = collection(db, "authors");
    const authorsSnapshot = await getDocs(authorsRef);
    const authors: Author[] = [];
    authorsSnapshot.forEach((doc) => {
      authors.push(doc.data() as Author);
    });

    console.log("combining...");
    const booksExport: BookExport[] = books.map((book) => {
      const bookAuthors: (Author | undefined)[] = book.authors.map((author) =>
        authors.find((a) => a.key === author)
      );
      return {
        ...book,
        authors: bookAuthors,
      };
    });

    console.log("formatting for csv...");
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
    console.log("writing to export.csv...");
    fs.writeFileSync("books.csv", csv, "utf-8");
    console.log("csv export successful!");
  } catch (e) {
    console.log("error exportin data", e);
  } finally {
    deleteApp(app);
    console.log("exiting...");
  }
})();
