import { db } from "@/data/firebase";
import { Author } from "@/models/Author";
import dayjs from "dayjs";
import { doc, getDoc } from "firebase/firestore";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`${dayjs().toISOString()} GET /api/authors/${id}`);

  try {
    const authorRef = doc(db, "authors", id);
    const authorSnapshot = await getDoc(authorRef);
    if (!authorSnapshot.exists()) {
      return NextResponse.json(
        {
          status: "Not Found",
          message: `Author with id ${id} not found`,
          response: "GET /api/authors",
          timestamp: dayjs().toISOString(),
        },
        {
          status: 404,
        }
      );
    }

    const author = {
      ...authorSnapshot.data(),
      "@context": {
        "@vocab": "https://schema.org/Person",
        name: "name",
        key: "identifier",
      },
      "@type": "Person",
    } as Author;
    return NextResponse.json(author);
  } catch (e) {
    console.log("error getting author", e);
    return NextResponse.json(
      {
        status: "Internal Server Error",
        message: "Error getting author data",
        response: "",
        timestamp: dayjs().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}
