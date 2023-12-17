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
    const authors = authorsSnapshot.docs.map((doc) => doc.data() as Author);

    return new NextResponse(JSON.stringify(authors, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    console.log("error dumping data", e);
    return new NextResponse(
      JSON.stringify({
        status: "Internal Server Error",
        message: "Error dumping authors",
        response: null,
        timestamp: dayjs().toISOString(),
      }),
      {
        status: 500,
      }
    );
  }
}
