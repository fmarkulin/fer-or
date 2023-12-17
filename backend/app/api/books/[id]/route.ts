import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookExport } from "@/models/BookExport";
import dayjs from "dayjs";
import { DocumentReference, deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`${dayjs().toISOString()} GET /api/books/${id}`);

  try {
    const bookRef = doc(db, "books", id);
    const bookSnapshot = await getDoc(bookRef);

    if (!bookSnapshot.exists()) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: `Book with id ${id} not found`,
          response: null,
          timestamp: dayjs().toISOString(),
        },
        {
          status: 404,
        }
      );
    }

    const book = bookSnapshot.data() as Book;

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

    return NextResponse.json(bookExport);
  } catch (e) {
    console.log("Error getting book data", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error getting book data",
        response: null,
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`${dayjs().toISOString()} DELETE /api/books/${id}`);

  try {
    const bookRef = doc(db, "books", id);
    const bookSnapshot = await getDoc(bookRef);

    if (!bookSnapshot.exists()) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: `Book with id ${id} not found`,
          response: null,
          timestamp: dayjs().toISOString(),
        },
        {
          status: 404,
        }
      );
    }

    await deleteDoc(bookRef);

    return NextResponse.json({
      status: "OK",
      message: `Book with id ${id} deleted`,
      response: bookSnapshot.data() as Book,
      timestamp: dayjs().toISOString(),
    });
  } catch (e) {
    console.log("Error deleting book", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error deleting book",
        response: null,
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}
