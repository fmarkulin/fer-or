import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookExport } from "@/models/BookExport";
import dayjs from "dayjs";
import {
  DocumentReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(`${dayjs().toISOString()} GET /api/books`);

  try {
    const bookRefs = collection(db, "books");
    const bookSnapshots = await getDocs(bookRefs);
    if (bookSnapshots.empty) {
      return new NextResponse(
        JSON.stringify({
          status: "Not Found",
          message: "No books found",
          response: null,
          timestamp: dayjs().toISOString(),
        }),
        {
          headers: {
            "content-type": "application/json",
          },
          status: 404,
        }
      );
    }

    const books: Book[] = [];
    bookSnapshots.forEach((snapshot) => books.push(snapshot.data() as Book));

    const booksExport: BookExport[] = [];
    for (const book of books) {
      const authorRefs: DocumentReference[] = book.authors.map((author) =>
        doc(db, "authors", author)
      );
      const authorSnapshots = await Promise.all(
        authorRefs.map((authorRef) => getDoc(authorRef))
      );
      const authors = authorSnapshots.map(
        (snapshot) => snapshot.data() as Author
      );

      const bookExport: BookExport = {
        ...book,
        authors,
      };

      booksExport.push(bookExport);
    }

    return new NextResponse(JSON.stringify(booksExport, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    console.log("Error getting books", e);
    return new NextResponse(
      JSON.stringify({
        status: "Internal Server Error",
        message: "Error getting books",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 500,
      }
    );
  }
}
