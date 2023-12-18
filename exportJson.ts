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

    console.log("formatting for json...");
    const booksExport: BookExport[] = books.map((book) => {
      const bookAuthors: (Author | undefined)[] = book.authors.map((author) =>
        authors.find((a) => a.key === author)
      );
      return {
        ...book,
        authors: bookAuthors,
      };
    });

    console.log("writing to export.json...");
    fs.writeFileSync(
      "books.json",
      JSON.stringify(booksExport, null, 2),
      "utf-8"
    );
    console.log("json export successful!");
  } catch (e) {
    console.log("error exportin data", e);
  } finally {
    deleteApp(app);
    console.log("exiting...");
  }
})();
