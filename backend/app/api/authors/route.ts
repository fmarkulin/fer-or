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

    const authors = authorsSnapshot.docs.map((doc) => doc.data() as Author);

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
