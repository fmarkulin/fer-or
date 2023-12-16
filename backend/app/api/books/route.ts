import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(dayjs().toISOString() + " GET /api/books");

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

    const dump: { collections: { books: Book[]; authors: Author[] } } = {
      collections: {
        books,
        authors,
      },
    };

    return new NextResponse(JSON.stringify(dump, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    console.log("error dumping data", e);
    return new NextResponse(
      JSON.stringify({
        status: "Internal Server Error",
        message: "Error dumping data",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  console.log(`${dayjs().toISOString()} DELETE /api/books}`, body);

  if (!("id" in body)) {
    return new NextResponse(
      JSON.stringify({
        status: "Bad Request",
        message: "Missing id",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 400,
      }
    );
  }

  const { id } = body;
  if (typeof id !== "string") {
    return new NextResponse(
      JSON.stringify({
        status: "Bad Request",
        message: "Parametar id must be a string",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const bookRef = doc(db, "books", id);
    const bookSnapshot = await getDoc(bookRef);

    if (!bookSnapshot.exists()) {
      return new NextResponse(
        JSON.stringify({
          status: "Not Found",
          message: `Book with id ${id} not found`,
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

    await deleteDoc(bookRef);

    return new NextResponse(
      JSON.stringify({
        status: "OK",
        message: `Book with id ${id} deleted`,
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log("Error deleting book", e);
    return new NextResponse(
      JSON.stringify({
        status: "Internal Server Error",
        message: "Error deleting book",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 500,
      }
    );
  }
}
