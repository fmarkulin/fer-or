import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookExport } from "@/models/BookExport";
import dayjs from "dayjs";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";

function isBook(obj: any): obj is Book {
  if (
    obj &&
    typeof obj.publishers === "object" &&
    Array.isArray(obj.publishers) &&
    typeof obj.number_of_pages === "number" &&
    typeof obj.latest_revision === "number" &&
    typeof obj.key === "string" &&
    typeof obj.authors === "object" &&
    Array.isArray(obj.authors) &&
    typeof obj.title === "string" &&
    typeof obj.subjects === "object" &&
    Array.isArray(obj.subjects) &&
    typeof obj.publish_date === "string" &&
    typeof obj.last_modified === "string" &&
    typeof obj.type === "string" &&
    typeof obj.revision === "number"
  ) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  console.log(`${dayjs().toISOString()} GET /api/books`);

  try {
    const bookRefs = collection(db, "books");
    const bookSnapshots = await getDocs(bookRefs);
    if (bookSnapshots.empty) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: "No books found",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
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

    return NextResponse.json(booksExport);
  } catch (e) {
    console.log("Error getting books", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error getting books",
        response: "",
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(`${dayjs().toISOString()} POST /api/books`);

    if (!isBook(body)) {
      return NextResponse.json(
        {
          status: "Bad Request",
          message: "Invalid book",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 400,
        }
      );
    }

    try {
      const bookRef = doc(db, "books", body.key);
      const bookSnapshot = await getDoc(bookRef);
      if (bookSnapshot.exists()) {
        return NextResponse.json(
          {
            status: "Conflict",
            message: "Book with this key already exists",
            response: bookSnapshot.data(),
            timestamp: dayjs().toISOString(),
          },
          {
            status: 409,
          }
        );
      }
    } catch (e) {
      console.log("Error checking if book exists", e);
      return NextResponse.json(
        {
          status: "Internal Server Error",
          message: "Error checking if book exists",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 500,
        }
      );
    }

    try {
      for (const author of body.authors) {
        const authorRef = doc(db, "authors", author);
        const authorSnapshot = await getDoc(authorRef);
        if (!authorSnapshot.exists()) {
          return NextResponse.json(
            {
              status: "Not Found",
              message: `Author with key ${author} not found`,
              response: "GET /api/authors",
              timestamp: dayjs().toISOString(),
            },
            {
              status: 404,
            }
          );
        }
      }
    } catch (e) {
      console.log("Error checking if authors exist", e);
      return NextResponse.json(
        {
          status: "Internal Server Error",
          message: "Error checking if authors exist",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 500,
        }
      );
    }

    const book = body as Book;
    const bookRef = doc(db, "books", book.key);
    try {
      await setDoc(bookRef, book);
      return NextResponse.json(
        {
          status: "OK",
          message: "Book created",
          response: `GET /api/books/${book.key}`,
          timestamp: dayjs().toISOString(),
        },
        {
          status: 200,
        }
      );
    } catch (e) {
      console.log("Error creating book", e);
      return NextResponse.json(
        {
          status: "Internal Server Error",
          message: "Error creating book",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 500,
        }
      );
    }
  } catch (e) {
    console.log("Error parsing request body", e);
    return NextResponse.json(
      {
        status: "Bad Request",
        message: "Error parsing request body",
        response: "",
        timestamp: dayjs().toISOString(),
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(`${dayjs().toISOString()} POST /api/books`);

    if (!isBook(body)) {
      return NextResponse.json(
        {
          status: "Bad Request",
          message: "Invalid book",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 400,
        }
      );
    }

    try {
      for (const author of body.authors) {
        const authorRef = doc(db, "authors", author);
        const authorSnapshot = await getDoc(authorRef);
        if (!authorSnapshot.exists()) {
          return NextResponse.json(
            {
              status: "Not Found",
              message: `Author with key ${author} not found`,
              response: "GET /api/authors",
              timestamp: dayjs().toISOString(),
            },
            {
              status: 404,
            }
          );
        }
      }
    } catch (e) {
      console.log("Error checking if authors exist", e);
      return NextResponse.json(
        {
          status: "Internal Server Error",
          message: "Error checking if authors exist",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 500,
        }
      );
    }

    const book = body as Book;
    const bookRef = doc(db, "books", book.key);
    try {
      const firestoreBook = await getDoc(bookRef);
      let existed = false;
      if (firestoreBook.exists()) {
        existed = true;
      }
      await setDoc(bookRef, book);
      return NextResponse.json(
        {
          status: "OK",
          message: `Book ${existed ? "updated" : "created"}`,
          response: `GET /api/books/${book.key}`,
          timestamp: dayjs().toISOString(),
        },
        {
          status: 200,
        }
      );
    } catch (e) {
      console.log("Error putting book", e);
      return NextResponse.json(
        {
          status: "Internal Server Error",
          message: "Error putting book",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 500,
        }
      );
    }
  } catch (e) {
    console.log("Error parsing request body", e);
    return NextResponse.json(
      {
        status: "Bad Request",
        message: "Error parsing request body",
        response: "",
        timestamp: dayjs().toISOString(),
      },
      {
        status: 400,
      }
    );
  }
}
