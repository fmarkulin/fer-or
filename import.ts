import { deleteApp, initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import * as books from "./books.json";
import * as authors from "./authors.json";

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

declare type Author = {
  name: string;
  last_modified: string;
  key: string;
  type: string;
  revision: number;
};

const typedBooks: Book[] = books;
const typedAuthors: Author[] = authors;

(async () => {
  try {
    for (let book of typedBooks) {
      await setDoc(doc(db, "books", book.key), {
        ...book,
      });
    }
    for (let author of typedAuthors) {
      await setDoc(doc(db, "authors", author.key), {
        ...author,
      });
    }
  } catch (e) {
    console.log("error filling db", e);
  } finally {
    deleteApp(app);
  }
})();
