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
      return new NextResponse(
        JSON.stringify({
          status: "Not Found",
          message: `Author with id ${id} not found`,
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

    const author = authorSnapshot.data() as Author;
    return new NextResponse(JSON.stringify(author, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    console.log("error getting author", e);
    return new NextResponse(
      JSON.stringify({
        status: "Internal Server Error",
        message: "Error getting author data",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 500,
      }
    );
  }
}
