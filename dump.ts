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
  console.log("gathering data...");

  try {
    const booksRef = collection(db, "books");
    const booksSnapshot = await getDocs(booksRef);
    const books: Book[] = [];
    booksSnapshot.forEach((snapshot) => books.push(snapshot.data() as Book));

    const authorsRef = collection(db, "authors");
    const authorsSnapshot = await getDocs(authorsRef);
    const authors: Author[] = [];
    authorsSnapshot.forEach((snapshot) =>
      authors.push(snapshot.data() as Author)
    );

    console.log("formatting data...");
    const dump: { collections: { books: Book[]; authors: Author[] } } = {
      collections: {
        books,
        authors,
      },
    };

    console.log("writing data to dump.json");
    fs.writeFileSync("dump.json", JSON.stringify(dump, null, 2), "utf-8");
    console.log("dump successful!")
  } catch (e) {
    console.log("error dumping data", e);
  } finally {
    console.log("exiting...")
    deleteApp(app);
  }
})();
