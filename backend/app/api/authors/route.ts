import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  console.log(dayjs().toISOString() + " GET /api/authors");

  try {
    const authorsRef = collection(db, "authors");
    const authorsSnapshot = await getDocs(authorsRef);
    if (authorsSnapshot.empty) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: "No authors found",
          response: "",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 404,
        }
      );
    }

    const authors = authorsSnapshot.docs.map((doc) => {
      const author = doc.data() as Author;
      return {
        ...author,
        "@context": {
          "@vocab": "https://schema.org/Person",
          name: "name",
          key: "identifier",
        },
        "@type": "Person",
      };
    });

    return NextResponse.json(authors);
  } catch (e) {
    console.log("error dumping authors", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error getting authors",
        response: "",
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}
