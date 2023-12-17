import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  console.log(dayjs().toISOString() + " GET /api/dump");

  try {
    const booksRef = collection(db, "books");
    const booksSnapshot = await getDocs(booksRef);
    if (booksSnapshot.empty) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: "No books found",
          response: null,
          timestamp: dayjs().toISOString(),
        },
        {
          status: 404,
        }
      );
    }

    const books: Book[] = [];
    booksSnapshot.forEach((snapshot) => books.push(snapshot.data() as Book));

    const authorsRef = collection(db, "authors");
    const authorsSnapshot = await getDocs(authorsRef);
    const authors: Author[] = [];
    authorsSnapshot.forEach((snapshot) =>
      authors.push(snapshot.data() as Author)
    );

    const dump: { collections: { books: Book[]; authors: Author[] } } = {
      collections: {
        books,
        authors,
      },
    };

    return NextResponse.json(dump);
  } catch (e) {
    console.log("error dumping data", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error dumping data",
        response: null,
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}
